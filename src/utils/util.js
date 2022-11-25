function switchSpace() {
  $(".spaceBtn").addClass("active");
  $(".spaceBtn").removeClass("commonBtn space");
  $(".galleryBtn").removeClass("active");
  $(".galleryBtn").addClass("gallery");
  $(".cyberpunkBtn").removeClass("active");
  $(".cyberpunkBtn").addClass("cyberpunk");
}
function switchGallery() {
  $(".galleryBtn").removeClass("gallery");
  $(".galleryBtn").addClass("active");
  $(".spaceBtn").removeClass("space active");
  $(".spaceBtn").addClass("commonBtn");
  $(".cyberpunkBtn").removeClass("active");
  $(".cyberpunkBtn").addClass("cyberpunk");
}
function switchCyberpunk() {
  $(".cyberpunkBtn").removeClass("cyberpunk");
  $(".cyberpunkBtn").addClass("active");
  $(".spaceBtn").removeClass("space active");
  $(".spaceBtn").addClass("commonBtn");
  $(".galleryBtn").removeClass("active");
  $(".galleryBtn").addClass("gallery");
}

export { switchSpace, switchGallery, switchCyberpunk };
