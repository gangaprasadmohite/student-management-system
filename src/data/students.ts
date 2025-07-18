export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  enrollmentDate: string;
  subjectIds: string[];
  status: 'active' | 'inactive' | 'graduated';
}

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@email.com",
    phone: "+1-555-0123",
    dateOfBirth: "2002-03-15",
    address: "123 Main St, City, State 12345",
    enrollmentDate: "2023-09-01",
    subjectIds: ["1", "3", "4"],
    status: "active"
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@email.com", 
    phone: "+91-555-0124",
    dateOfBirth: "2001-07-22",
    address: "456 Oak Ave, City, State 12346",
    enrollmentDate: "2023-09-01",
    subjectIds: ["2", "5", "7", "9"],
    status: "active"
  },
  {
    id: "3",
    firstName: "Carol",
    lastName: "Davis",
    email: "carol.davis@email.com",
    phone: "+1-555-0125",
    dateOfBirth: "2002-11-08",
    address: "789 Pine Rd, City, State 12347",
    enrollmentDate: "2024-01-15",
    subjectIds: ["6", "8", "10"],
    status: "active"
  }
];