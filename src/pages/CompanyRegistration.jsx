import Select from 'react-select'
import MultiFileUploader from '../components/ImageFileUploader/MultiFileUploader';
import PDFUploader from '../components/ImageFileUploader/PDFUploader';
import StepperComponent from '../components/StepperComponent/StepperComponent';
import { useState } from 'react';


const CompanyRegistration = ({ onSubmit, handleFileSelected, deleteFileHandler, register, handleSubmit, errors, control, Controller, currentStep, assetFiles }) => {

    const [fileErrors, setFileErrors] = useState("");
    const [pdfErrors, setPDFErrors] = useState("");

    const handleNext = (data) => {
        localStorage.clear();
        onSubmit(data)
    };

    return (
        <>
            <StepperComponent currentStep={currentStep} />
            <div className=' bg-white p-3 shadow-sm shadow-blue-500 rounded'>
                <p className='text-xl text-center font-bold py-8 text-gray-500'>Company Registration Details</p>

                <form onSubmit={handleSubmit(handleNext)}>
                    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 w-[90%] md:w-[75%] mx-auto'>
                        <div className='flex flex-col'>
                            <p className='mb-1 text-gray-500'>Company Type<span className='text-red-600 font-bold'>*</span></p>
                            <Controller
                                name="companyType"
                                control={control}
                                rules={{ required: "Company type is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={[
                                            { value: "IT", label: "IT" },
                                            { value: "Finance", label: "Finance" },
                                            { value: "Manufacturing", label: "Manufacturing" },
                                        ]}
                                        classNamePrefix="react-select"
                                        placeholder="Select Company Type"
                                    />
                                )}
                            />
                            {errors.companyType && <span className="text-red-600">Company type is required</span>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Company Name<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="text"
                                placeholder="Company Name..."
                                className="input input-bordered w-full"
                                {...register('companyName', { required: true })}
                            />
                            {errors.companyName && <span className="text-red-600">Company Name is required</span>}
                        </div>
                    </div>

                    <div className='flex justify-center my-8'>
                        <p className='p-2 bg2 font-bold text-gray-500'>Owner's Details</p>
                    </div>

                    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 w-[90%] md:w-[75%] mx-auto'>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Owner's Name<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="text"
                                placeholder="Owner's Name..."
                                className="input input-bordered w-full"
                                {...register('ownerName', { required: true })}
                            />
                            {errors.ownerName && <span className="text-red-600">Owner's Name is required</span>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>NID Number<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="text"
                                placeholder="NID Number..."
                                className="input input-bordered w-full"
                                {...register('nidNumber', { required: true, minLength: 10, maxLength: 17, })}
                            />
                            {errors.nidNumber?.type === 'required' && (
                                <span className="text-red-600">NID Number is required</span>
                            )}
                            {errors.nidNumber?.type === 'minLength' && (
                                <span className="text-red-600">NID Number must be at least 10 characters long</span>
                            )}
                            {errors.nidNumber?.type === 'maxLength' && (
                                <span className="text-red-600">NID Number cannot exceed 17 characters</span>
                            )}
                        </div>


                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Owner's Photo<span className='text-red-600 font-bold'>*</span></p>
                            <MultiFileUploader
                                height="120px"
                                img={{ width: "50px", height: "54px" }}
                                onFilesSelected={(files) => handleFileSelected(files, 'ownerPhoto')}
                                deleteFileHandler={(file) => deleteFileHandler('ownerPhoto', file)}
                                name="ownerPhoto"
                                setFileErrors={setFileErrors}
                            />
                            {!assetFiles.ownerPhoto && fileErrors && <small className="text-red-600">{fileErrors}</small>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>NID Card Photo Copy<span className='text-red-600 font-bold'>*</span></p>
                            <MultiFileUploader
                                height="120px"
                                img={{ width: "50px", height: "54px" }}
                                onFilesSelected={(files) => handleFileSelected(files, 'nidPhoto')}
                                deleteFileHandler={(file) => deleteFileHandler('nidPhoto', file)}
                                name="nidPhoto"
                                setFileErrors={setFileErrors}
                            />
                            {!assetFiles.nidPhoto && fileErrors && <small className="text-red-600">{fileErrors}</small>}
                        </div>
                        <div className='flex flex-col'>
                            <p className='mb-1 text-gray-500 mt-8'>Consisting of maximum number of vessels having minimum cargo carrying capacity of 1200 MT<span className='text-red-600 font-bold'>*</span></p>
                            <Controller
                                name="vesselsHaving"
                                control={control}
                                rules={{ required: "Maximum number of vessels is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={[
                                            { value: "100", label: "100" },
                                            { value: "200", label: "200" },
                                            { value: "300", label: "300" },
                                        ]}
                                        classNamePrefix="react-select"
                                        placeholder="Select How Many Vessel"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className='my-12'>
                        <hr />
                    </div>
                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 w-[90%] mx-auto items-center'>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Trade License<span className='text-red-600 font-bold'>*</span></p>
                            <PDFUploader
                                height="120px"
                                img={{ width: "50px", height: "54px" }}
                                onFilesSelected={(files) => handleFileSelected(files, 'tradeLicense')}
                                deleteFileHandler={(file) => deleteFileHandler('tradeLicense', file)}
                                name="tradeLicense"
                                setPDFErrors={setPDFErrors}
                            />
                            
                            {!assetFiles.tradeLicense && pdfErrors && <small className="text-red-600">{pdfErrors}</small>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Trade License Number<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="number"
                                placeholder="Trade License Number..."
                                className="input input-bordered w-full"
                                {...register('tradeLicenseNumber', { required: true })}
                            />
                            {errors.tradeLicenseNumber && <span className="text-red-600">Trade License Number is required</span>}

                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Trade Validity<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="date"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                {...register('tradeValidity', { required: true })}
                            />
                            {errors.tradeValidity && <span className="text-red-600">Trade Validity is required</span>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 w-[90%] mx-auto my-12'>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Bank Solvency Certificate<span className='text-red-600 font-bold'>*</span></p>
                            <PDFUploader
                                height="120px"
                                img={{ width: "50px", height: "54px" }}
                                onFilesSelected={(files) => handleFileSelected(files, 'bankSolvencyCertificate')}
                                deleteFileHandler={(file) => deleteFileHandler('bankSolvencyCertificate', file)}
                                name="bankSolvencyCertificate"
                                setPDFErrors={setPDFErrors}
                            />
                            {!assetFiles.bankSolvencyCertificate && pdfErrors && <small className="text-red-600">{pdfErrors}</small>}
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 w-[90%] mx-auto items-center'>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Tin Certificate<span className='text-red-600 font-bold'>*</span></p>
                            <PDFUploader
                                height="120px"
                                img={{ width: "50px", height: "54px" }}
                                onFilesSelected={(files) => handleFileSelected(files, 'tinCertificate')}
                                deleteFileHandler={(file) => deleteFileHandler('tinCertificate', file)}
                                name="tinCertificate"
                                setPDFErrors={setPDFErrors}
                            />
                            {!assetFiles.tinCertificate && pdfErrors && <small className="text-red-600">{pdfErrors}</small>}

                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Tin Certificate Number<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="number"
                                placeholder="Tin Certificate Number..."
                                className="input input-bordered w-full"
                                {...register('tinCertificateNumber', { required: true })}
                            />
                            {errors.tinCertificateNumber && <span className="text-red-600">Tin Certificate Number is required</span>}
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 w-[90%] mx-auto items-center my-12'>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Bin Certificate<span className='text-red-600 font-bold'>*</span></p>
                            <PDFUploader
                                height="120px"
                                img={{ width: "50px", height: "54px" }}
                                onFilesSelected={(files) => handleFileSelected(files, 'binCertificate')}
                                deleteFileHandler={(file) => deleteFileHandler('binCertificate', file)}
                                name="binCertificate"
                                setPDFErrors={setPDFErrors}
                            />
                           {!assetFiles.binCertificate && pdfErrors && <small className="text-red-600">{pdfErrors}</small>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Bin Certificate Number<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="number"
                                placeholder="Bin Certificate Number..."
                                className="input input-bordered w-full"
                                {...register('binCertificateNumber', { required: true })}
                            />
                            {errors.binCertificateNumber && <span className="text-red-600">Bin Certificate Number is required</span>}
                        </div>
                    </div>

                    <div className='flex justify-center my-5'>
                        <button type="submit" className='btn btn-primary text-white px-12'>Next</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CompanyRegistration;