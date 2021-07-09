export const getImgToBase64 = (url, callback) => {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
};
