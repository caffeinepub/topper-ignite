import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // PDF Metadata Type
  public type PDFMetadata = {
    id : Nat;
    title : Text;
    blobId : Storage.ExternalBlob;
    uploadedAt : Time.Time;
  };

  let pdfs = Map.empty<Nat, PDFMetadata>();
  var nextId = 0;

  // Add PDF - Admin Only
  public shared ({ caller }) func addPDF(title : Text, blobId : Storage.ExternalBlob) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add PDFs");
    };

    let pdf : PDFMetadata = {
      id = nextId;
      title;
      blobId;
      uploadedAt = Time.now();
    };

    pdfs.add(nextId, pdf);
    nextId += 1;
    pdf.id;
  };

  // Delete PDF - Admin Only
  public shared ({ caller }) func deletePDF(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete PDFs");
    };

    if (not pdfs.containsKey(id)) {
      Runtime.trap("PDF not found");
    };

    pdfs.remove(id);
  };

  // Get all PDFs - Authenticated Users Only (students and admins)
  public query ({ caller }) func getAllPDFs() : async [PDFMetadata] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view PDFs");
    };

    pdfs.values().toArray();
  };
};
