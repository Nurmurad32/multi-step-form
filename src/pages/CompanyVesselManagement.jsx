import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CompanyRegistration from './CompanyRegistration';
import VesselRegistration from './VesselRegistration';
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';

const CompanyVesselManagement = () => {
    const { register, handleSubmit, formState: { errors }, control, setValue, unregister } = useForm();
    const [formData, setFormData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate()

    const [assetFiles, setAssetFiles] = useState({
        ownerPhoto: null,
        nidPhoto: null,
        tradeLicense: null,
        bankSolvencyCertificate: null,
        tinCertificate: null,
        binCertificate: null,
        shipsDraftChart: null,
        routePermitLetter: null,
        registrationCertificate: null,
        insuranceCertificate: null,
        surveyCertificate: null,
        conservancyCertificate: null,
    });

    const handleFileSelected = async (files, fileName) => {
        unregister(fileName);

        const file = files[0]; // Since you're receiving only one file at a time
        let processedFile = file;

        // Compress the file if it's an image
        if (file.type.startsWith('image/')) {
            processedFile = await imageCompression(file, { maxSizeMB: 1 });
        }

        // Update state with the processed file
        setAssetFiles((prevLoadFiles) => ({
            ...prevLoadFiles,
            [fileName]: processedFile,
        }));

        // Register the file field manually with the processed file
        setValue(fileName, processedFile);
    };

    const deleteFileHandler = (fileName) => {
        setAssetFiles((prevLoadFiles) => ({
            ...prevLoadFiles,
            [fileName]: null,
        }));
        setValue(fileName, null);
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleCompanySubmit = (data) => {
        // console.log(data)
        const submittedCompanyData = {
            ...data, assetFiles: {
                ownerPhoto: assetFiles.ownerPhoto ? {
                    name: assetFiles.ownerPhoto.name,
                    path: URL.createObjectURL(assetFiles.ownerPhoto),
                } : null,
                nidPhoto: assetFiles.nidPhoto ? {
                    name: assetFiles.nidPhoto.name,
                    path: URL.createObjectURL(assetFiles.nidPhoto),
                } : null,
                tradeLicense: assetFiles.tradeLicense ? {
                    name: assetFiles.tradeLicense.name,
                    path: URL.createObjectURL(assetFiles.tradeLicense),
                } : null,
                bankSolvencyCertificate: assetFiles.bankSolvencyCertificate ? {
                    name: assetFiles.bankSolvencyCertificate.name,
                    path: URL.createObjectURL(assetFiles.bankSolvencyCertificate),
                } : null,
                tinCertificate: assetFiles.tinCertificate ? {
                    name: assetFiles.tinCertificate.name,
                    path: URL.createObjectURL(assetFiles.tinCertificate),
                } : null,
                binCertificate: assetFiles.binCertificate ? {
                    name: assetFiles.binCertificate.name,
                    path: URL.createObjectURL(assetFiles.binCertificate),
                } : null,
            },
        };

        setFormData(submittedCompanyData)
        nextStep();
    };
    console.log(formData);

    const handleVesselSubmit = (data) => {
        const { assetFiles: vesselAssetFiles, ...restData } = data;

        // Combine assetFiles from both steps
        const combinedAssetFiles = {
            ...assetFiles,
            ...vesselAssetFiles,
        };

        const finalFormData = {
            ...formData,
            ...restData,
            assetFiles: {
                ownerPhoto: combinedAssetFiles.ownerPhoto ? {
                    name: combinedAssetFiles.ownerPhoto.name,
                    path: URL.createObjectURL(combinedAssetFiles.ownerPhoto),
                } : null,
                nidPhoto: combinedAssetFiles.nidPhoto ? {
                    name: combinedAssetFiles.nidPhoto.name,
                    path: URL.createObjectURL(combinedAssetFiles.nidPhoto),
                } : null,
                tradeLicense: combinedAssetFiles.tradeLicense ? {
                    name: combinedAssetFiles.tradeLicense.name,
                    path: URL.createObjectURL(combinedAssetFiles.tradeLicense),
                } : null,
                bankSolvencyCertificate: combinedAssetFiles.bankSolvencyCertificate ? {
                    name: combinedAssetFiles.bankSolvencyCertificate.name,
                    path: URL.createObjectURL(combinedAssetFiles.bankSolvencyCertificate),
                } : null,
                tinCertificate: combinedAssetFiles.tinCertificate ? {
                    name: combinedAssetFiles.tinCertificate.name,
                    path: URL.createObjectURL(combinedAssetFiles.tinCertificate),
                } : null,
                binCertificate: combinedAssetFiles.binCertificate ? {
                    name: combinedAssetFiles.binCertificate.name,
                    path: URL.createObjectURL(combinedAssetFiles.binCertificate),
                } : null,
                shipsDraftChart: combinedAssetFiles.shipsDraftChart ? {
                    name: combinedAssetFiles.shipsDraftChart.name,
                    path: URL.createObjectURL(combinedAssetFiles.shipsDraftChart),
                } : null,
                routePermitLetter: combinedAssetFiles.routePermitLetter ? {
                    name: combinedAssetFiles.routePermitLetter.name,
                    path: URL.createObjectURL(combinedAssetFiles.routePermitLetter),
                } : null,
                registrationCertificate: combinedAssetFiles.registrationCertificate ? {
                    name: combinedAssetFiles.registrationCertificate.name,
                    path: URL.createObjectURL(combinedAssetFiles.registrationCertificate),
                } : null,
                insuranceCertificate: combinedAssetFiles.insuranceCertificate ? {
                    name: combinedAssetFiles.insuranceCertificate.name,
                    path: URL.createObjectURL(combinedAssetFiles.insuranceCertificate),
                } : null,
                surveyCertificate: combinedAssetFiles.surveyCertificate ? {
                    name: combinedAssetFiles.surveyCertificate.name,
                    path: URL.createObjectURL(combinedAssetFiles.surveyCertificate),
                } : null,
                conservancyCertificate: combinedAssetFiles.conservancyCertificate ? {
                    name: combinedAssetFiles.conservancyCertificate.name,
                    path: URL.createObjectURL(combinedAssetFiles.conservancyCertificate),
                } : null,

            },
        };

        localStorage.setItem('companyData', JSON.stringify(finalFormData));
        navigate("/")
        console.log('Final Data:', finalFormData);
    };
    return (
        <>
            {currentStep === 1 && (
                <CompanyRegistration
                    onSubmit={handleCompanySubmit}
                    handleFileSelected={handleFileSelected}
                    deleteFileHandler={deleteFileHandler}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    control={control}
                    Controller={Controller}
                    currentStep={currentStep}
                />
            )}
            {currentStep === 2 && (
                <VesselRegistration
                    onSubmit={handleVesselSubmit}
                    handleFileSelected={handleFileSelected}
                    deleteFileHandler={deleteFileHandler}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    control={control}
                    Controller={Controller}
                    currentStep={currentStep}
                />
            )}
        </>
    );
};

export default CompanyVesselManagement;