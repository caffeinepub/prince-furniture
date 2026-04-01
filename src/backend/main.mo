import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Float "mo:core/Float";
import List "mo:core/List";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  module Product {
    public func compareByCategory(p1 : Product, p2 : Product) : Order.Order {
      switch (Text.compare(p1.category, p2.category)) {
        case (#equal) { Text.compare(p1.name, p2.name) };
	      case (order) { order };
      };
    };
    // Sort products by price (ascending) and then by name if prices are equal
    public func compareByPrice(p1 : Product, p2 : Product) : Order.Order {
      switch (Float.compare(p1.price, p2.price)) {
        case (#equal) { Text.compare(p1.name, p2.name) };
	      case (order) { order };
      };
    };
  };
  
  type Product = {
    id : Nat;
    name : Text;
    category : Text;
    price : Float;
    description : Text;
    imageUrl : Text;
    featured : Bool;
    createdAt : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  // Initialize access control state properly
  let accessControlState = AccessControl.initState();
  
  // Add mixins - this makes all functions of the mixins available in this actor
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Product Management
  var nextProductId = 1;
  let products = Map.empty<Nat, Product>();
  let categories = ["Beds", "Cupboards", "Dining Sets", "Coffee Tables", "Chairs", "Sofas"];
  
  // User profiles
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user: Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public query functions - no authorization needed (accessible to all including guests)
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductById(id : Nat) : async ?Product {
    products.get(id);
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let filtered = products.values().toArray().filter(
      func(p) {
        Text.equal(p.category, category);
      }
    );
    filtered.sort(Product.compareByCategory);
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    let filtered = products.values().toArray().filter(
      func(p) { p.featured }
    );
    filtered.sort(Product.compareByPrice);
  };

  public query ({ caller }) func searchProducts(searchTerm : Text) : async [Product] {
    let lowerSearch = searchTerm.toLower();
    let filtered = products.values().toArray().filter(
      func(p) {
        p.name.toLower().contains(#text lowerSearch) or
        p.description.toLower().contains(#text lowerSearch);
      }
    );
    filtered.sort(Product.compareByPrice);
  };

  public query ({ caller }) func getAllCategories() : async [Text] {
    categories;
  };

  // Admin-only functions
  public shared ({ caller }) func createProduct(product : Product) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };

    let newProduct = {
      product with
      id = nextProductId;
      createdAt = Time.now();
    };
    products.add(nextProductId, newProduct);
    nextProductId += 1;
    newProduct.id;
  };

  public shared ({ caller }) func updateProduct(id : Nat, product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    let updatedProduct = {
      product with
      id;
    };
    products.add(id, updatedProduct);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };

  // Seed sample products in every upgrade to not lose them due to bugs
  system func postupgrade() {
    seedProducts();
  };

  func seedProducts() {
    // Only seed if products are empty
    if (products.size() == 0) {
      let samples = [
        {
          id = 1;
          name = "King Size Bed";
          category = "Beds";
          price = 499.99;
          description = "Luxurious king size bed with solid wood frame.";
          imageUrl = "https://example.com/bed1.jpg";
          featured = true;
          createdAt = Time.now();
        },
        {
          id = 2;
          name = "Queen Size Bed";
          category = "Beds";
          price = 399.99;
          description = "Comfortable queen size bed with upholstered headboard.";
          imageUrl = "https://example.com/bed2.jpg";
          featured = false;
          createdAt = Time.now();
        },
        {
          id = 3;
          name = "Sliding Door Cupboard";
          category = "Cupboards";
          price = 299.99;
          description = "Spacious cupboard with sliding doors and multiple shelves.";
          imageUrl = "https://example.com/cupboard1.jpg";
          featured = false;
          createdAt = Time.now();
        },
        {
          id = 4;
          name = "Wardrobe with Mirror";
          category = "Cupboards";
          price = 349.99;
          description = "Elegant wardrobe with full-length mirror.";
          imageUrl = "https://example.com/cupboard2.jpg";
          featured = true;
          createdAt = Time.now();
        },
        {
          id = 5;
          name = "6-Seater Dining Set";
          category = "Dining Sets";
          price = 599.99;
          description = "Elegant dining set with table and 6 cushioned chairs.";
          imageUrl = "https://example.com/dining1.jpg";
          featured = true;
          createdAt = Time.now();
        },
        {
          id = 6;
          name = "4-Seater Dining Set";
          category = "Dining Sets";
          price = 399.99;
          description = "Compact dining set perfect for small spaces.";
          imageUrl = "https://example.com/dining2.jpg";
          featured = false;
          createdAt = Time.now();
        },
        {
          id = 7;
          name = "Glass Top Coffee Table";
          category = "Coffee Tables";
          price = 149.99;
          description = "Modern coffee table with tempered glass top.";
          imageUrl = "https://example.com/coffee1.jpg";
          featured = false;
          createdAt = Time.now();
        },
        {
          id = 8;
          name = "Wooden Coffee Table";
          category = "Coffee Tables";
          price = 179.99;
          description = "Classic wooden coffee table with storage drawer.";
          imageUrl = "https://example.com/coffee2.jpg";
          featured = true;
          createdAt = Time.now();
        },
        {
          id = 9;
          name = "Office Chair";
          category = "Chairs";
          price = 129.99;
          description = "Ergonomic office chair with lumbar support.";
          imageUrl = "https://example.com/chair1.jpg";
          featured = false;
          createdAt = Time.now();
        },
        {
          id = 10;
          name = "Dining Chairs Set";
          category = "Chairs";
          price = 199.99;
          description = "Set of 4 comfortable dining chairs.";
          imageUrl = "https://example.com/chair2.jpg";
          featured = false;
          createdAt = Time.now();
        },
        {
          id = 11;
          name = "3-Seater Sofa";
          category = "Sofas";
          price = 699.99;
          description = "Luxurious 3-seater sofa with premium fabric.";
          imageUrl = "https://example.com/sofa1.jpg";
          featured = true;
          createdAt = Time.now();
        },
        {
          id = 12;
          name = "L-Shaped Sofa";
          category = "Sofas";
          price = 899.99;
          description = "Spacious L-shaped sofa perfect for living rooms.";
          imageUrl = "https://example.com/sofa2.jpg";
          featured = true;
          createdAt = Time.now();
        },
      ];
      
      for (i in Nat.range(0, samples.size())) {
        products.add(i + 1, samples[i]);
      };
      nextProductId := samples.size() + 1;
    };
  };
};
