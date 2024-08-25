import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./multiFileUploder.css";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { CiFolderOn } from "react-icons/ci";
import imageCompression from "browser-image-compression";
import { FcAddImage } from "react-icons/fc";
import { FaRegTrashAlt } from "react-icons/fa";

const MultiFileUploader = ({
	label,
	initialFiles,
	onFilesSelected,
	deleteFileHandler,
	name,
	height = "200px",
	img = {
		height: "108px",
		width: "100px",
	},
	setFileErrors
}) => {
	const [uploadedFiles, setUploadedFiles] = useState([]);

	useEffect(() => {
		// Set the initial files when the component mounts
		if (initialFiles && initialFiles.length > 0) {
			setUploadedFiles(initialFiles);
		}
	}, [initialFiles]);

	const handleImageCompression = async (file) => {
		if (file.size <= 1048576) {
			// If the file is already less than 1MB, no need to compress
			return file;
		}

		try {
			const compressedFile = await imageCompression(file, {
				maxSizeMB: 1,
				maxWidthOrHeight: 1920,
				useWebWorker: true,
			});
			setFileErrors("")
			return compressedFile;
		} catch (error) {
			console.error("Error compressing the image:", error);
			setFileErrors("Error compressing the image. Please try again.");
			return file;
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: async (acceptedFiles, rejectedFiles) => {
			rejectedFiles.forEach((file) => {
				const fileError = file.errors && file.errors.length > 0 ? file.errors[0] : null;
				if (fileError) {
					switch (fileError.code) {
						case "too-many-files":
							setFileErrors("You can only upload a maximum of 1 file.");
							break;
						case "file-too-large":
							setFileErrors("The file size should not exceed 1 MB.");
							break;
						default:
							setFileErrors("Error uploading file. Please try again.");
							break;
					}
				}
			});

			if (acceptedFiles.length > 0) {
				const compressedFile = await handleImageCompression(acceptedFiles[0]);
				setFileErrors("")
				setUploadedFiles([compressedFile]);
				onFilesSelected([compressedFile], name);
			}
		},
		accept: "image/*", // Accept only image files
		maxFiles: 1,
		maxSize: 1048576, // 1MB in bytes
	});

	return (
		<div className="dropzone">
			<div {...getRootProps()} className="mainDropzone ">
				<input {...getInputProps()} />
				<h4 style={{ opacity: 0.8 }} className="label">
					{label}
				</h4>
			</div>

			{uploadedFiles.length > 0 ? (
				<ul className="previewList">
					{uploadedFiles.map((file, index) => {
						const isImage = file.type.startsWith("image/");

						const fileSource = isImage
							? URL.createObjectURL(file)
							: file.location;

						return (
							<ul key={index}>
								<li>
									{isImage ? (
										<img
											src={fileSource}
											className="previewImg"
											style={{ height: img.height, width: img.width }}
											alt={file.name}
										/>
									) : (
										<>
											<div className="avatar">
												<CiFolderOn />
											</div>
											<p
												style={{ fontSize: "10px", width: "100px" }}
											>{file.name}</p>
										</>
									)}
								</li>
								<li>
									<div className="iconArea">
										{/* <FaCloudDownloadAlt
											onClick={() => {
												const newTab = window.open(fileSource, "_blank");
												if (!newTab) {
													alert("Popup blocked. Please allow popups for file preview.");
												}
											}}
										/> */}
										<FaRegTrashAlt
											onClick={() => {
												setUploadedFiles([]);
												deleteFileHandler(name, file);
											}}
											color="error"
											className="text-red-600"
										/>
									</div>
								</li>
							</ul>
						);
					})}
				</ul>
			) : (
				<div>
					<p style={{ textAlign: "center", marginBottom: 0 }} className="flex justify-center">
						<FcAddImage  className="uploadIcon" />
					</p>
					<p className="text text-left">Drag and drop {label} files here, or <span className="text-blue-600">click to select files</span></p>
					<p className="text text-left text-blue-600">Maximum file size 1 MB</p>
				</div>
			)}
		</div>
	);
};

export default MultiFileUploader;
