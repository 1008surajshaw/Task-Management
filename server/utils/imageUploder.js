const cloudinary = require('cloudinary').v2;

exports.uploadFileToCloudinary = async (file, folder) => {
    try {
        console.log("twooooo")
        const options = { folder }; // Options for Cloudinary upload (e.g., folder name)
        options.resource_type="auto"
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log(result,"okkkk")
        return result;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};
