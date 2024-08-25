import React, { useState } from 'react';
import StepperComponent from '../components/StepperComponent/StepperComponent';
import PDFUploader from '../components/ImageFileUploader/PDFUploader';

const VesselRegistration = ({ onSubmit, handleFileSelected, deleteFileHandler, register, handleSubmit, errors, control, Controller, currentStep, assetFiles }) => {

    const [pdfErrors, setPDFErrors] = useState("");
    const handleFinalSubmit = (data) => {
        onSubmit(data); // Pass data to the parent component
    };

    return (
        <>
            <StepperComponent currentStep={currentStep} />
            <div className=' bg-white p-3 shadow-sm shadow-blue-500 rounded'>
                <p className='text-xl text-center font-bold py-8 text-gray-500'>Vessel Details</p>

                <form onSubmit={handleSubmit(handleFinalSubmit)}>

                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 w-[90%] mx-auto'>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Vessel's Name<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="text"
                                placeholder="Vessel's Name..."
                                className="input input-bordered w-full"
                                {...register('vesselName', { required: true })}
                            />
                            {errors.vesselName && <span className="text-red-600">Vessel's Name is required</span>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Registration NO<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="number"
                                placeholder="Registration NO..."
                                className="input input-bordered w-full"
                                {...register('registrationNo', { required: true })}
                            />
                            {errors.registrationNo && <span className="text-red-600">Registration NO is required</span>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Engine Capacity (BHP)<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="number"
                                placeholder="Engine Capacity (BHP)..."
                                className="input input-bordered w-full"
                                {...register('engineCapacity', { required: true })}
                            />
                            {errors.engineCapacity && <span className="text-red-600">Engine Capacity (BHP) is required</span>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Year of Build<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="date"
                                placeholder="Year of Build..."
                                className="input input-bordered w-full"
                                {...register('buildYear', { required: true })}
                            />
                            {errors.buildYear && <span className="text-red-600">Year of Build is required</span>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Capacity (Metric Ton)<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="number"
                                placeholder="Capacity (Metric Ton)..."
                                className="input input-bordered w-full"
                                {...register('capacityMetricTon', { required: true })}
                            />
                            {errors.capacityMetricTon && <span className="text-red-600">Capacity (Metric Ton) is required</span>}
                        </div>
                    </div>

                    <div className='flex justify-center my-10'>
                        <p className='p-2 bg2 font-bold text-gray-500'>Vessel Details</p>
                    </div>

                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 w-[90%] mx-auto'>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Length<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="text"
                                placeholder="Length..."
                                className="input input-bordered w-full"
                                {...register('vesselLength', { required: true })}
                            />
                            {errors.vesselLength && <span className="text-red-600">Vessel's Length is required</span>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Width<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="text"
                                placeholder="Width..."
                                className="input input-bordered w-full"
                                {...register('vesselWidth', { required: true })}
                            />
                            {errors.vesselWidth && <span className="text-red-600">Vessel's Width is required</span>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Depth<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="text"
                                placeholder="Depth..."
                                className="input input-bordered w-full"
                                {...register('vesselDepth', { required: true })}
                            />
                            {errors.vesselDepth && <span className="text-red-600">Vessel's Depth is required</span>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500 mt-6'>Whether navigable in turbulent waters of the Gulf?<span className='text-red-600 font-bold'>*</span></p>
                            <div className='flex justify-between'>
                                <div className="sq-radio">
                                    <input type="radio" id="yes" value="YES" {...register('navigable', { required: true })} />
                                    <span className="checkmark"></span>
                                    <label htmlFor="yes" className='ml-2'>YES</label>
                                </div>
                                <div className="sq-radio">
                                    <input type="radio" id="no" value="NO" {...register('navigable', { required: true })} />
                                    <span className="checkmark"></span>
                                    <label htmlFor="no" className='ml-2'>NO</label>
                                </div>
                            </div>
                            {errors.navigable && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>

                    <div className='flex justify-center my-8'>
                        <p className='p-2 bg2 font-bold text-gray-500'>Features</p>
                    </div>
                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 w-[90%] mx-auto'>
                        <div className='max-w-sm'>
                            <input type="checkbox" id="vhf" value="VHF" {...register('turbulentGolfFeatures')} />
                            <label htmlFor="vhf" className='ml-2'>VHF</label>
                        </div>
                        <div className='max-w-sm'>
                            <input type="checkbox" id="radar" value="Radar" {...register('turbulentGolfFeatures')} />
                            <label htmlFor="radar" className='ml-2'>Radar</label>
                        </div>
                        <div className='max-w-sm'>
                            <input type="checkbox" id="ecoSounder" value="Eco Sounder" {...register('turbulentGolfFeatures')} />
                            <label htmlFor="ecoSounder" className='ml-2'>Eco Sounder</label>
                        </div>
                    </div>

                    <div className='my-12'>
                        <hr />
                    </div>

                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 w-[90%] mx-auto items-center my-12'>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Ship's Draft Chart<span className='text-red-600 font-bold'>*</span></p>
                            <PDFUploader
                                height="120px"
                                img={{ width: "50px", height: "54px" }}
                                onFilesSelected={(files) => handleFileSelected(files, 'shipsDraftChart')}
                                deleteFileHandler={(file) => deleteFileHandler('shipsDraftChart', file)}
                                name="shipsDraftChart"
                            />
                            {errors.shipsDraftChart && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Route Permit Letter<span className='text-red-600 font-bold'>*</span></p>
                            <PDFUploader
                                height="120px"
                                img={{ width: "50px", height: "54px" }}
                                onFilesSelected={(files) => handleFileSelected(files, 'routePermitLetter')}
                                deleteFileHandler={(file) => deleteFileHandler('routePermitLetter', file)}
                                name="routePermitLetter"
                                setPDFErrors={setPDFErrors}
                                />
                                
                                {!assetFiles.routePermitLetter && pdfErrors && <small className="text-red-600">{pdfErrors}</small>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Route Permit Duration<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="date"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                {...register('routePermitDuration', { required: true })}
                            />
                            {errors.routePermitDuration && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 w-[90%] mx-auto items-center my-12'>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Registration Certificate<span className='text-red-600 font-bold'>*</span></p>
                            <PDFUploader
                                height="120px"
                                img={{ width: "50px", height: "54px" }}
                                onFilesSelected={(files) => handleFileSelected(files, 'registrationCertificate')}
                                deleteFileHandler={(file) => deleteFileHandler('registrationCertificate', file)}
                                name="registrationCertificate"
                                setPDFErrors={setPDFErrors}
                                />
                                
                                {!assetFiles.registrationCertificate && pdfErrors && <small className="text-red-600">{pdfErrors}</small>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Registration Certificate No<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="number"
                                placeholder="Registration Certificate No..."
                                className="input input-bordered w-full"
                                {...register('registrationCertificateNo', { required: true })}
                            />
                            {errors.registrationCertificateNo && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 w-[90%] mx-auto items-center my-12'>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Insurance Certificate<span className='text-red-600 font-bold'>*</span></p>
                            <PDFUploader
                                height="120px"
                                img={{ width: "50px", height: "54px" }}
                                onFilesSelected={(files) => handleFileSelected(files, 'insuranceCertificate')}
                                deleteFileHandler={(file) => deleteFileHandler('insuranceCertificate', file)}
                                name="insuranceCertificate"
                                setPDFErrors={setPDFErrors}
                                />
                                
                                {!assetFiles.insuranceCertificate && pdfErrors && <small className="text-red-600">{pdfErrors}</small>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Insurance Certificate No<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="number"
                                placeholder="Insurance Certificate No..."
                                className="input input-bordered w-full"
                                {...register('insuranceCertificateNo', { required: true })}
                            />
                            {errors.insuranceCertificateNo && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Insurance Certificate Validity<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="date"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                {...register('insuranceValidity', { required: true })}
                            />
                            {errors.insuranceValidity && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 w-[90%] mx-auto items-center my-12'>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Survey Certificate<span className='text-red-600 font-bold'>*</span></p>
                            <PDFUploader
                                height="120px"
                                img={{ width: "50px", height: "54px" }}
                                onFilesSelected={(files) => handleFileSelected(files, 'surveyCertificate')}
                                deleteFileHandler={(file) => deleteFileHandler('surveyCertificate', file)}
                                name="surveyCertificate"
                                setPDFErrors={setPDFErrors}
                                />
                                
                                {!assetFiles.surveyCertificate && pdfErrors && <small className="text-red-600">{pdfErrors}</small>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Survey Certificate No<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="number"
                                placeholder="Survey Certificate No..."
                                className="input input-bordered w-full"
                                {...register('surveyCertificateNo', { required: true })}
                            />
                            {errors.surveyCertificateNo && <span className="text-red-600">Survey Certificate No is required</span>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Survey Certificate Validity<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="date"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                {...register('surveyValidity', { required: true })}
                            />
                            {errors.surveyValidity && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3 w-[90%] mx-auto items-center my-12'>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Conservancy Certificate<span className='text-red-600 font-bold'>*</span></p>
                            <PDFUploader
                                height="120px"
                                img={{ width: "50px", height: "54px" }}
                                onFilesSelected={(files) => handleFileSelected(files, 'conservancyCertificate')}
                                deleteFileHandler={(file) => deleteFileHandler('conservancyCertificate', file)}
                                name="conservancyCertificate"
                                setPDFErrors={setPDFErrors}
                            />
                            
                            {!assetFiles.conservancyCertificate && pdfErrors && <small className="text-red-600">{pdfErrors}</small>}
                        </div>
                        <div className='max-w-sm'>
                            <p className='mb-1 text-gray-500'>Conservancy Certificate Validity<span className='text-red-600 font-bold'>*</span></p>
                            <input
                                type="date"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                {...register('conservancyValidity', { required: true })}
                            />
                            {errors.conservancyValidity && <span className="text-red-600">Conservancy Validity is required</span>}
                        </div>
                    </div>

                    <div className='flex justify-center my-5'>
                        <button type="submit" className='btn btn-primary px-12 text-white'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default VesselRegistration;