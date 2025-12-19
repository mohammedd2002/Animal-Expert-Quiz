class FileService {
    // Return Null Or File Name (string)
  static  getImageName(fileInput) {
        if (!fileInput) {

            return null;
        }

        if (fileInput.files.length > 0) {

            return fileInput.files[0].name;
        } else {

            return null;
        }
    }

}