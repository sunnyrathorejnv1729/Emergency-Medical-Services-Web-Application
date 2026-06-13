import { gql } from '@apollo/client';

// ─── AUTH ────────────────────────────────────────────────
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user { id name email role department licenseNumber phone }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user { id name email role department licenseNumber phone }
    }
  }
`;

export const ME = gql`
  query Me {
    me { id name email role department licenseNumber phone avatar lastSeen }
  }
`;

// ─── USERS ───────────────────────────────────────────────
export const GET_USERS = gql`
  query GetUsers($role: UserRole) {
    users(role: $role) { id name email role department licenseNumber phone isActive lastSeen }
  }
`;

// ─── PATIENTS ────────────────────────────────────────────
export const GET_PATIENTS = gql`
  query GetPatients($status: PatientStatus, $search: String) {
    patients(status: $status, search: $search) {
      id patientId fullName firstName lastName dateOfBirth gender bloodType
      status allergies currentMedications incidentLocation
      assignedDoctor { id name role }
      assignedEMT { id name role }
      latestVital { heartRate bloodPressureSystolic bloodPressureDiastolic oxygenSaturation temperature recordedAt }
      createdAt updatedAt
    }
  }
`;

export const GET_PATIENT = gql`
  query GetPatient($id: ID!) {
    patient(id: $id) {
      id patientId fullName firstName lastName dateOfBirth gender bloodType
      allergies currentMedications medicalHistory status incidentLocation
      emergencyContact { name relationship phone }
      assignedDoctor { id name email role department phone }
      assignedEMT { id name email role department phone }
      vitals {
        id heartRate bloodPressureSystolic bloodPressureDiastolic
        oxygenSaturation temperature respiratoryRate glucoseLevel
        recordedAt notes recordedBy { id name role }
      }
      createdAt updatedAt
    }
  }
`;

export const CREATE_PATIENT = gql`
  mutation CreatePatient($input: PatientInput!) {
    createPatient(input: $input) {
      id patientId fullName status createdAt
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($id: ID!, $input: PatientInput!) {
    updatePatient(id: $id, input: $input) {
      id patientId fullName status
    }
  }
`;

export const UPDATE_PATIENT_STATUS = gql`
  mutation UpdatePatientStatus($patientId: ID!, $status: PatientStatus!) {
    updatePatientStatus(patientId: $patientId, status: $status) {
      id status updatedAt
    }
  }
`;

export const ASSIGN_PATIENT = gql`
  mutation AssignPatient($patientId: ID!, $doctorId: ID, $emtId: ID) {
    assignPatient(patientId: $patientId, doctorId: $doctorId, emtId: $emtId) {
      id assignedDoctor { id name } assignedEMT { id name }
    }
  }
`;

// ─── VITALS ──────────────────────────────────────────────
export const RECORD_VITALS = gql`
  mutation RecordVitals($input: VitalInput!) {
    recordVitals(input: $input) {
      id heartRate bloodPressureSystolic bloodPressureDiastolic
      oxygenSaturation temperature respiratoryRate glucoseLevel
      recordedAt notes recordedBy { id name }
    }
  }
`;

// ─── MEDICAL RECORDS ─────────────────────────────────────
export const GET_MEDICAL_RECORDS = gql`
  query GetMedicalRecords($patientId: ID!) {
    medicalRecords(patientId: $patientId) {
      id title description recordType fileName fileUrl fileSize mimeType
      isConfidential tags createdAt
      uploadedBy { id name role }
    }
  }
`;

export const GET_UPLOAD_URL = gql`
  query GetUploadUrl($fileName: String!, $fileType: String!) {
    getUploadUrl(fileName: $fileName, fileType: $fileType) {
      uploadUrl fileUrl s3Key
    }
  }
`;

export const CREATE_MEDICAL_RECORD = gql`
  mutation CreateMedicalRecord($input: MedicalRecordInput!) {
    createMedicalRecord(input: $input) {
      id title recordType fileName fileUrl createdAt
      uploadedBy { id name }
    }
  }
`;

export const DELETE_MEDICAL_RECORD = gql`
  mutation DeleteMedicalRecord($id: ID!) {
    deleteMedicalRecord(id: $id)
  }
`;

// ─── MESSAGES ────────────────────────────────────────────
export const GET_MESSAGES = gql`
  query GetMessages($room: String!, $limit: Int) {
    messages(room: $room, limit: $limit) {
      id content messageType priority room isRead createdAt
      sender { id name role }
      patient { id patientId fullName }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: MessageInput!) {
    sendMessage(input: $input) {
      id content priority createdAt
      sender { id name role }
    }
  }
`;

// ─── DASHBOARD ───────────────────────────────────────────
export const DASHBOARD_STATS = gql`
  query DashboardStats {
    dashboardStats {
      totalPatients criticalPatients activeDoctors activeEMTs totalRecords recentAlerts
    }
  }
`;

// ─── SUBSCRIPTIONS ───────────────────────────────────────
export const VITAL_SUBSCRIPTION = gql`
  subscription VitalRecorded($patientId: ID!) {
    vitalRecorded(patientId: $patientId) {
      id heartRate bloodPressureSystolic bloodPressureDiastolic
      oxygenSaturation temperature respiratoryRate glucoseLevel
      recordedAt notes recordedBy { id name }
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageReceived($room: String!) {
    messageReceived(room: $room) {
      id content messageType priority room createdAt
      sender { id name role }
      patient { id patientId fullName }
    }
  }
`;

export const PATIENT_STATUS_SUBSCRIPTION = gql`
  subscription PatientStatusChanged($patientId: ID) {
    patientStatusChanged(patientId: $patientId) {
      id status fullName updatedAt
    }
  }
`;

export const ALERT_SUBSCRIPTION = gql`
  subscription AlertTriggered {
    alertTriggered {
      id content priority createdAt
      sender { id name role }
      patient { id patientId fullName }
    }
  }
`;
