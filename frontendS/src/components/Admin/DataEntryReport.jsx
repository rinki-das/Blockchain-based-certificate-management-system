import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './DataEntryReport.css';

const DataEntryReport = ({
  courseName,
  courseCode,
  batchCode,
  startDate,
  endDate,
  examDate,
  excelData,
}) => {
  const generatePDFReport = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      format: 'a4',
    });

    const logosWidth = 30;
    const logosHeight = 30;
    const logosX = 10;
    const logosY = 15;
    doc.addImage('https://pbs.twimg.com/profile_images/882321654499516416/TbHUUffy_400x400.jpg', 'PNG', logosX, logosY, logosWidth, logosHeight);

    const title = 'National Institute Of Electronics & Information Technology (NIELIT) Kolkata';
    const titleHeight = doc.getTextDimensions(title).h;
    const titleX = logosX + logosWidth + 10;
    const titleY = logosY + (logosHeight - titleHeight) / 2;
    doc.text(title, titleX, titleY);

    const subTitle = `JU Campus, Kolkata-700032\nCourse: ${courseName}                    Start Date: ${startDate}\nEnd Date: ${endDate}                    Course Code: ${courseCode}`;
    const subTitleX = titleX;
    const subTitleY = titleY + titleHeight;
    doc.text(subTitle, subTitleX, subTitleY);

    const headers = [
      'Sl No.',
      'Course Name',
      'Start Date',
      'End Date',
      'Student ID',
      'Student Name',
      'Marks Obtained (Theory) (40)',
      'Marks Obtained (Project) (10)',
      '% of Marks',
      'Total Marks',
      'Grade',
      'Certificate No',
    ];

    // Extract the data from the excelData prop and calculate the Total Marks and Grade
    const data = excelData.map((item, index) => {
      // Calculate the total marks by adding theory and project marks
      const totalMarks = item.theoryMarks + item.projectMarks;

      // Calculate the percentage of total marks (out of 50)
      const percentageMarks = (totalMarks / 50) * 100;

      // Calculate the grade based on the percentage of marks
      let grade = '';
      if (percentageMarks >= 90) {
        grade = 'A+';
      } else if (percentageMarks >= 80) {
        grade = 'A';
      } else if (percentageMarks >= 70) {
        grade = 'B+';
      } else if (percentageMarks >= 60) {
        grade = 'B';
      } else if (percentageMarks >= 50) {
        grade = 'C+';
      } else if (percentageMarks >= 40) {
        grade = 'C';
      } else {
        grade = 'Absent';
      }

      // Update the "Total Marks" and "Grade" fields in the data array
      item['Total Marks'] = totalMarks;
      item['Grade'] = grade;

      return [
        index + 1, // Sl No.
        item.courseName, // Course Name
        item.startDate, // Start Date
        item.endDate, // End Date
        item.studentId, // Student ID
        item.studentName, // Student Name
        item.theoryMarks, // Marks Obtained (Theory) (40)
        item.projectMarks, // Marks Obtained (Project) (10)
        `${percentageMarks}%`, // % of Marks (calculated)
        item['Total Marks'], // Total Marks (calculated)
        item['Grade'], // Grade (calculated)
        item.certificateNo, // Certificate No
      ];
    });

    doc.autoTable({
      startY: 50,
      head: [headers],
      body: data,
      theme: 'plain',
      styles: { fontSize: 7 },
      headStyles: { fillColor: [211, 211, 211] },
    });

    // Add a horizontal line below the table
    doc.setLineWidth(0.10);
    doc.setDrawColor(0);
    doc.line(10, doc.autoTable.previous.finalY + 5, 280, doc.autoTable.previous.finalY + 5);

    doc.setFontSize(8);

    // Count the number of times "Absent" appears in "Marks Obtained (Project) (10)"
    const totalStudentsAbsent = data.filter(item => item[7] === 'Absent').length;
    const totalStudentsDiscontinued = data.filter(item => item[6] === '' && item[7] === '').length;
    const totalStudentsFailed = data.filter(
      item => item['Marks Obtained (Project) (10)'] < 4 && item['Marks Obtained (Theory) (40)'] < 15
    ).length;

    // Calculate the "Present" value based on total and absent students
    const totalStudentsPresent = data.length - totalStudentsAbsent;

    // Add the totals section below the table and line
    doc.text(
      `Total: ${data.length}              Present: ${totalStudentsPresent}              Absent: ${totalStudentsAbsent}              Fail: ${totalStudentsFailed}              Discontinued: ${totalStudentsDiscontinued}`,
      10,
      doc.autoTable.previous.finalY + 10
    );

    // Add one more text line
    doc.text('Grade: A+ (90% & above)  A (80%-89%)  B+ (70%-79%) B (60%-69%)  C+ (50%-59%)  C (40%-49%)  Fail (Less than 40%)', 10, doc.autoTable.previous.finalY + 15);
    doc.text('Prepared by                      Checked & verified by Course Coordinator                      Exam Dept. Verification                       Executive Director', 10, doc.autoTable.previous.finalY + 40);

    doc.save('data_entry_report.pdf');
  };

  return (
    <div className="containers">
      <button className="print-button" onClick={generatePDFReport}>Print Report</button>
    </div>
  );
};

export default DataEntryReport;






























