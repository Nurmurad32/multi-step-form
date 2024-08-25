import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./multiFileUploder.css";
import { toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaCloudDownloadAlt, FaRegTrashAlt } from "react-icons/fa";
import { CiFolderOn } from "react-icons/ci";

const PDFUploader = ({
	label,
	initialFiles,
	onFilesSelected,
	deleteFileHandler,
	name,
	height = "200px",
	setPDFErrors
}) => {
	const [uploadedFiles, setUploadedFiles] = useState([]);

	useEffect(() => {
		if (initialFiles && initialFiles.length > 0) {
			setUploadedFiles(initialFiles);
		}
	}, [initialFiles]);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles, rejectedFiles) => {
			let tooManyFilesErrorEncountered = false;

			rejectedFiles.forEach((file) => {
				const fileError = file.errors && file.errors.length > 0 ? file.errors[0] : null;
				if (fileError) {
					switch (fileError.code) {
						case "too-many-files":
							if (!tooManyFilesErrorEncountered) {
								setPDFErrors("You can only upload a maximum of 1 file.");
								tooManyFilesErrorEncountered = true;
							}
							break;
						case "file-too-large":
							setPDFErrors("The file size should not exceed 1 MB.");
							break;
						default:
							setPDFErrors("Error uploading file. Please try again.");
							break;
					}
				}
			});

			// Validate accepted files
			const validFiles = acceptedFiles.filter((file) => {
				const fileType = file.type;
				const fileExtension = file.name.split('.').pop().toLowerCase();
				// console.log("File type:", fileType); 
				// console.log("File extension:", fileExtension);
				
				// Check for both MIME type and extension
				if (fileType === "application/pdf" && fileExtension === "pdf") {
					// setPDFErrors(" ")
					return true;
				} else {
					setPDFErrors(`Invalid file type or extension: ${fileType}, .${fileExtension}`);
					return false;
				}
			});

			const newFiles = [...uploadedFiles, ...validFiles];
			setUploadedFiles(newFiles);
			onFilesSelected(newFiles, name);
		},
		accept: "application/pdf",
		maxFiles: 1,
		maxSize: 1048576, // 1MB
	});

	return (
		<div className="dropzone">
			<div {...getRootProps()} className="mainDropzone dropZoneImage">
				<input {...getInputProps()} />
				<h4 style={{ opacity: 0.8 }} className="label">
					{label}
				</h4>
			</div>

			{uploadedFiles.length > 0 ? (
				<ul className="previewList">
					{uploadedFiles.map((file, index) => {
						const isPDF = file.type === "application/pdf";

						return (
							<ul key={index}>
								<li>
									{isPDF ? (
										<>
											<div className="avatar flex justify-center">
												<CiFolderOn />
											</div>
											<p style={{ fontSize: "10px", width: "100px" }}>
												{file.name}
											</p>
										</>
									) : (
										<p>Unsupported file type</p>
									)}
								</li>
								<li>
									<div className="iconArea">
										{/* <FaCloudDownloadAlt
											onClick={() => {
												const newTab = window.open(URL.createObjectURL(file), "_blank");
												if (!newTab) {
													alert("Popup blocked. Please allow popups for file preview.");
												}
											}}
										/> */}
										<FaRegTrashAlt
											onClick={() => {
												const newFiles = [...uploadedFiles];
												newFiles.splice(index, 1);
												setUploadedFiles(newFiles);
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
						<AiOutlineCloudUpload className="uploadIcon" />
					</p>
					<p className="text text-left">Drag and drop {label} files here, or <span className="text-blue-600">click to select files</span></p>
					<p className="text text-left text-blue-600">Maximum file size 1 MB</p>
				</div>
			)}
		</div>
	);
};

export default PDFUploader;

