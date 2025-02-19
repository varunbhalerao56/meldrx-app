// src/lib/models/consultationPrep.ts

export type PatientSummary = {
    name: string;
    age: number;
    currentMedications: string[];
    ongoingConditions: string[];
    analyzedPeriod: string;
};

export type ConsultationQuestion = {
    question: string;
    rationale: string;
    source: string;
};

export type QuestionCategory = {
    category: string;
    questions: ConsultationQuestion[];
};

export type PreventiveCareNeed = {
    type: string;
    description: string;
    dueDate: string;
    lastCompleted: string;
};

export type ConsultationPrepData = {
    patientSummary: PatientSummary;
    consultationQuestions: QuestionCategory[];
    preventiveCareNeeds: PreventiveCareNeed[];
};