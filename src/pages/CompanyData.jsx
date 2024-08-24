import React, { useEffect, useState } from 'react';

const CompanyData = () => {
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = JSON.parse(localStorage.getItem('companyData'));
    if (storedData) {
      setCompanyData(storedData);
    }
  }, []);

  console.log(companyData);

  const renderFile = (file) => {
    const fileType = file?.name?.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
      return <img src={file.path} alt="Company File" className="w-24 h-24" />;
    } else if (fileType === 'pdf') {
      return (
        <a href={file.path} download={file.name} className="text-blue-500 underline">
          Download PDF
        </a>
      );
    } else {
      return <p>Unsupported file type</p>;
    }
  };
  return (
    <div className="company-data">
      <h2 className='text-3xl text-center mt-4 mb-8 underline'>Company Registration Data</h2>
      {companyData ? (
        <div className="overflow-x-auto">
          <table className="table table-md">
            <tbody>
              <tr>
                <th>Company Name:</th>
                <td>{companyData?.companyName}</td>
              </tr>
              <tr>
                <th>Company Type:</th>
                <td>{companyData?.companyType?.label}</td>
              </tr>
              <tr>
                <th>Owner's Name:</th>
                <td>{companyData?.ownerName}</td>
                <td>{renderFile(companyData.assetFiles.ownerPhoto)}</td>
              </tr>
              <tr>
                <th>NID Number:</th>
                <td>{companyData?.nidNumber}</td>
                <td>{renderFile(companyData.assetFiles.nidPhoto)}</td>
              </tr>
              <tr>
                <th>Number of vessels:</th>
                <td>{companyData?.vesselsHaving?.label}</td>
              </tr>
              <tr>
                <th>Trade License</th>
                <td>{companyData?.tradeLicenseNumber}</td>
                <td>{companyData?.tradeValidity}</td>
                <td>{renderFile(companyData.assetFiles.tradeLicense)}</td>

              </tr>
              <tr>
                <th>Bank Solvency</th>
                <td>{renderFile(companyData.assetFiles.bankSolvencyCertificate)}</td>
              </tr>
              <tr>
                <th>Tin Certificate</th>
                <td>{companyData?.tinCertificateNumber}</td>
                <td>{renderFile(companyData.assetFiles.tinCertificate)}</td>
              </tr>
              <tr>
                <th>Bin Certificate</th>
                <td>{companyData?.binCertificateNumber}</td>
                <td>{renderFile(companyData.assetFiles.binCertificate)}</td>
              </tr>
              <tr>
                <th>Vessel Information</th>
              </tr>
              <tr>
                <th>{companyData?.vesselName}</th>
                <td>{companyData?.registrationNo}</td>
                <td>{companyData?.engineCapacity}</td>
                <td>{companyData?.buildYear}</td>
                <td>{companyData?.capacityMetricTon} (Metric Ton)</td>
              </tr>
              <tr>
                <td>Length: {companyData?.vesselLength}</td>
                <td>Width: {companyData?.vesselWidth}</td>
                <td>Depth: {companyData?.vesselDepth}</td>
              </tr>
              <tr>
                <td>Length: {companyData?.navigable}</td>
                {companyData?.turbulentGolfFeatures.length > 0
                  ? companyData?.turbulentGolfFeatures.map(a => (<td key={a}>{a} </td>))
                  : ""
                }
              </tr>
              <tr>
                <th>Ship's Draft Chart</th>
                <td>{renderFile(companyData.assetFiles.shipsDraftChart)}</td>
              </tr>
              <tr>
                <th>Route Permit Latter</th>
                <td>Validity: {companyData?.routePermitDuration}</td>
                <td>{renderFile(companyData.assetFiles.routePermitLetter)}</td>
              </tr>
              <tr>
                <th>Registration Certificate</th>
                <td>{companyData?.registrationCertificateNo}</td>
                <td>{renderFile(companyData.assetFiles.registrationCertificate)}</td>
              </tr>
              <tr>
                <th>Insurance Certificate</th>
                <td>{companyData?.insuranceCertificateNo}</td>
                <td>Validity:{companyData?.insuranceValidity}</td>
                <td>{renderFile(companyData.assetFiles.insuranceCertificate)}</td>
              </tr>
              <tr>
                <th>Survey Certificate</th>
                <td>{companyData?.surveyCertificateNo}</td>
                <td>Validity:{companyData?.surveyValidity}</td>
                <td>{renderFile(companyData.assetFiles.surveyCertificate)}</td>
              </tr>
              <tr>
                <th>Conservancy Certificate</th>
                <td>Validity:{companyData?.conservancyValidity}</td>
                <td>{renderFile(companyData.assetFiles.conservancyCertificate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
};

export default CompanyData;
