# image-compression-service

This is a TypeScript, Node.js, and Express.js project that focuses on image manipulation, specifically compressing images, converting image types to WebP format, and resizing images.

## Features

- Image Compression: Compresses images to reduce file size.✅
- Image Type Conversion: Converts image types (e.g., JPG) to WebP format.👷
- Image Resizing: Resizes images by adjusting their height and width.👷

## Installation

1. Clone the repository:
   git clone https://github.com/Xcceleran-do/image-compression-service

2. Navigate to the project directory:
   cd image-compression-service

3. Install dependencies:
   yarn

## Usage

1. Ensure you have Node.js installed (version 16.0.0 or higher).

2. Configure the project by updating the necessary settings (e.g., file paths, compression options) in the source code.

3. Run the project:
   yarn start

   This will start the Express.js server and allow you to perform the image manipulation tasks through the API.

## Example

Here's an example of how to compress an image, convert its type to WebP, and resize it using the project's API:

1. Start the server:
   yarn start

2. Compress the image:
   POST /api/v1/compress
   Request body: { "imagePath": "path/to/image.jpg", "outputPath": "path/to/compressed-image.jpg", "quality": 80 }

3. Convert image type to WebP:
   POST /api/v1/convert
   Request body: { "imagePath": "path/to/image.jpg", "outputPath": "path/to/webp-image.webp" }

4. Resize the image:
   POST /api/v1/resize
   Request body: { "imagePath": "path/to/image.jpg", "outputPath": "path/to/resized-image.jpg", "width": 800, "height": 600 }

Remember to replace 'path/to/image.jpg' and other file paths with the actual paths to your image files. Adjust the compression quality, width, and height values according to your requirements.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
