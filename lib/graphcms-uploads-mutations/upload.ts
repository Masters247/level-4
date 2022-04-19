const assetUpload = async (data: any) => {
  console.log("data image", data);

  let image = new Image();
  image.src = data;
  image.onload = function () {
    console.log("new image width", image.width);
  };
};

export default assetUpload;
