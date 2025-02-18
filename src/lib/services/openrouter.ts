export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export class OpenRouterClient {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://openrouter.ai/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  getPromptMessage(clinicalNotes: string): string {
    return `

      SYSTEM: YOU ARE AN ASSISTANT THAT ONLY SPEAKS JSON. DO NOT WRITE NORMAL TEXT.

      # Clinical Notes Analysis Prompt

      Analyze the provided clinical notes and generate a comprehensive JSON report following the structure and definitions below:

      ## Analysis Requirements

      ### Clinical Notes
      ${clinicalNotes}
      
      ### Output Format Json
      {
        "conditions": [                      // List of medical conditions, do not include duplicates of the same conditions and like employment or medication reviews
          {
            "name": "string",                // Name of the medical condition
            "severityLevel": "string",       // Values: ["Mild", "Moderate", "Severe", "Resolved"]
            "reasonForSeverity": "string",   // Explanation for severity assessment
            "timelineStart": "date",         // First mention/diagnosis date
            "timelineEnd": "date",           // Last mention or "present"
            "riskFactors": ["string"],       // Associated risk factors
            "healthImpact": "string",        // Impact on patient's health
            "progressionPattern": "string"   // Values: ["Improving", "Stable", "Worsening", "Resolved"]
          }
        ],
        "followUpCare": [                   // Recommended follow-up care list, do not include duplicates
          {
            "careName": "string",            // Name of recommended follow-up
            "reasonForFollowUp": "string",   // Why this follow-up is needed
            "recommendedFrequency": "string", // How often follow-up should occur
            "priorityLevel": "string",       // Values: ["Low", "Medium", "High", "Urgent"]
            "lastVisitDate": "date",         // Date of last related visit
            "nextDueDate": "date",           // When next follow-up is due
            "complianceStatus": "string"     // Values: ["Compliant", "Partially Compliant", "Non-compliant"]
          }
        ],
        "treatmentPredictions": [            // List of treatment predictions, do not include duplicates
          {
            "conditionTreated": "string",    // Condition being treated
            "expectedOutcome": "string",     // Values: ["Favorable", "Guarded", "Poor", "Uncertain"]
            "patientAdherence": "string",    // Values: ["High", "Moderate", "Low"]
            "supportingEvidence": "string",  // Evidence for prediction
            "confidenceLevel": "string",     // Values: ["High", "Moderate", "Low"]
            "timeframe": "string"            // Expected timeframe for outcome
          }
        ],
        "medicationAdherence": [              // List of medication adherence records
          {
            "medicationName": "string",      // Name and dosage of medication
            "adherenceLevel": "string",      // Values: ["High", "Moderate", "Low"]
            "startDate": "date",             // When medication was started
            "endDate": "date",               // When medication ended or "current"
            "sideEffectsReported": ["string"], // Any reported side effects
            "renewalPattern": "string",      // Values: ["Regular", "Irregular", "Discontinued"]
          }
        ],
        "preventiveCare": [                  // List of preventive care services
          {
            "serviceName": "string",         // Name of preventive service
            "recommendedFrequency": "string", // How often service should occur
            "lastServiceDate": "date",       // Date of last service
            "complianceLevel": "string",     // Values: ["Optimal", "Adequate", "Suboptimal"]
            "nextDueDate": "date",           // When next service is due
          }
        ],
      }

      ## Scale Definitions

      ### Severity Levels
      - Mild: Minimal impact on daily life, easily managed
      - Moderate: Notable impact on daily life, requires regular management
      - Severe: Significant impact on daily life, requires intensive management
      - Resolved: Condition no longer active

      ### Priority Levels
      - Low: Routine follow-up acceptable
      - Medium: Should be addressed within normal timeframes
      - High: Requires close monitoring
      - Urgent: Immediate attention needed

      ### Outcome Expectations
      - Favorable: High likelihood of positive outcome
      - Guarded: Uncertain but leaning positive
      - Poor: High likelihood of negative outcome
      - Uncertain: Insufficient data to predict

      ### Adherence/Compliance Levels
      - High: >90% compliance with treatment plan
      - Moderate: 60-90% compliance
      - Low: <60% compliance

      ### Confidence Levels
      - High: Strong evidence supporting assessment
      - Moderate: Some evidence with some uncertainty
      - Low: Limited evidence or significant uncertainty

      ## Analysis Guidelines

      1. Base all assessments on explicit evidence from the clinical notes d
      2. Include specific document IDs and dates for all sources
      3. Note any conflicting information or uncertainties
      4. Consider temporal patterns and trends
      5. Account for social and environmental factors
      6. Document any gaps in information that affect confidence levels
      7. Do not repeat the same condition / follow-up care / treatment predictions in the list unless there are distinct aspects to discuss

      ## Required Analyses

      For each section, provide:
      1. Comprehensive review of all relevant documentation
      2. Temporal analysis of patterns and trends
      3. Evidence-based assessment using provided scales
      4. Clear documentation of sources and reasoning
      5. Identification of any information gaps
      6. Assessment of confidence in conclusions

      The output should be properly formatted JSON suitable for programmatic processing and UI display.
      `;
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Medical Notes Analysis'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-sonnet',
          messages: messages,
          stream: false,
          temperature: 1,
          max_tokens: 100000
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenRouter API Error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.error(data);

      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }

  async streamChat(messages: ChatMessage[], onChunk: (chunk: string) => void): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Medical Notes Analysis'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-sonnet', // Updated model ID
          messages: messages,
          stream: true,
          temperature: 1,
          max_tokens: 100000
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenRouter API Error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;
              if (content) onChunk(content);
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      throw error;
    }
  }
}
