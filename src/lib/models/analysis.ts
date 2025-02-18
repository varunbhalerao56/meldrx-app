// src/lib/types/analysis.ts

export type Condition = {
    name: string;
    severityLevel: 'Mild' | 'Moderate' | 'Severe' | 'Resolved';
    reasonForSeverity: string;
    timelineStart: string;
    timelineEnd: string;
    riskFactors: string[];
    healthImpact: string;
    progressionPattern: 'Improving' | 'Stable' | 'Worsening' | 'Resolved';
};

export type FollowUpCare = {
    careName: string;
    reasonForFollowUp: string;
    recommendedFrequency: string;
    priorityLevel: 'Low' | 'Medium' | 'High' | 'Urgent';
    lastVisitDate: string;
    nextDueDate: string;
    complianceStatus: 'Compliant' | 'Partially Compliant' | 'Non-compliant';
};

export type TreatmentPrediction = {
    conditionTreated: string;
    expectedOutcome: 'Favorable' | 'Guarded' | 'Poor' | 'Uncertain';
    patientAdherence: 'High' | 'Moderate' | 'Low';
    supportingEvidence: string;
    confidenceLevel: 'High' | 'Moderate' | 'Low';
    timeframe: string;
};

export type MedicationAdherence = {
    medicationName: string;
    adherenceLevel: 'High' | 'Moderate' | 'Low';
    startDate: string;
    endDate: string;
    sideEffectsReported: string[];
    renewalPattern: 'Regular' | 'Irregular' | 'Discontinued';
};

export type PreventiveCare = {
    serviceName: string;
    recommendedFrequency: string;
    lastServiceDate: string;
    complianceLevel: 'Optimal' | 'Adequate' | 'Suboptimal';
    nextDueDate: string;
};

export type AnalysisData = {
    conditions: Condition[];
    followUpCare: FollowUpCare[];
    treatmentPredictions: TreatmentPrediction[];
    medicationAdherence: MedicationAdherence[];
    preventiveCare: PreventiveCare[];
};