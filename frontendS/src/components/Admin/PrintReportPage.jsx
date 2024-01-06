import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PrintReportPage = ({
  reportData,
  setShowPrintReportPage,
  courseName,
  startDate,
  endDate,
  courseCode,
}) => {
  useEffect(() => {
    generatePDF();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      format: 'a4',
    });

    // Add logos and titles at the top of the page
    const logosWidth = 30;
    const logosHeight = 30;
    const logosX = 10;
    const logosY = 15;
    doc.addImage(
      'https://pbs.twimg.com/profile_images/882321654499516416/TbHUUffy_400x400.jpg',
      'PNG',
      logosX,
      logosY,
      logosWidth,
      logosHeight
    );

    const title =
      'National Institute Of Electronics & Information Technology (NIELIT) Kolkata';
    const titleHeight = doc.getTextDimensions(title).h;
    const titleX = logosX + logosWidth + 10;
    const titleY = logosY + (logosHeight - titleHeight) / 2;
    doc.text(title, titleX, titleY);

    const subTitle = `JU Campus, Kolkata-700032\nCourse: ${courseName}                    Start Date: ${startDate}\nEnd Date: ${endDate}                    Course Code: ${courseCode}`;
    const subTitleX = titleX;
    const subTitleY = titleY + titleHeight;
    doc.text(subTitle, subTitleX, subTitleY);

    // Add table in the middle of the page
    const headers = [
        'Sl No.',
      'Course Name',
      'Start Date',
      'End Date',
      'Student Name',
      'Student ID',
      'Theory Marks',
      'Project Marks',
      'Percentage Marks',
      'Grade',
      'Total Marks',
    ];
    const data = reportData.map((row) => [
       
      row.courseName,
      row.startDate,
      row.endDate,
      row.studentName,
      row.studentId,
      row.theoryMarks,
      row.projectMarks,
      row.percentageMarks,
      row.grade,
      row.totalMarks,
    ]);

    doc.autoTable({
      startY: subTitleY + 10,
      head: [headers],
      body: data,
      theme: 'plain',
      styles: { fontSize: 7 },
      headStyles: { fillColor: [211, 211, 211], fontSize: 8 },
    });
       // Add a horizontal line below the table
       doc.setLineWidth(0.10);
       doc.setDrawColor(0);
       doc.line(10, doc.autoTable.previous.finalY + 5, 280, doc.autoTable.previous.finalY + 5);
   
       doc.setFontSize(8);

 
    // Add one more text line
    doc.text('Grade: A+ (90% & above)  A (80%-89%)  B+ (70%-79%) B (60%-69%)  C+ (50%-59%)  C (40%-49%)  Fail (Less than 40%)', 10, doc.autoTable.previous.finalY + 15);
    doc.text('Prepared by                      Checked & verified by Course Coordinator                      Exam Dept. Verification                       Executive Director', 10, doc.autoTable.previous.finalY + 40);

    doc.save('data_entry_report.pdf');

    setShowPrintReportPage(false); // Close the PrintReportPage after generating the PDF
  };

  return <div>{/* You can add any additional content for the Print Report Page if needed */}</div>;
};

export default PrintReportPage;




