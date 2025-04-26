import { Position } from '../../domain/models/Position';

interface CandidateResponse {
    id: number;
    fullName: string;
    currentInterviewStep: string;
    averageScore: number | null;
}

/**
 * Get all candidates for a specific position
 * @param positionId The ID of the position
 * @returns Array of candidates with their interview status and average score
 */
export const getPositionCandidates = async (positionId: number): Promise<CandidateResponse[]> => {
    try {
        // Validate that the position exists
        const position = await Position.findById(positionId);
        
        if (!position) {
            throw new Error('Position not found');
        }
        
        // Retrieve all applications for this position with candidates and interviews
        const candidates = await Position.getCandidatesForPosition(positionId);
        
        // Format the data to return only what we need
        return candidates.map(candidate => ({
            id: candidate.id,
            fullName: `${candidate.firstName} ${candidate.lastName}`,
            currentInterviewStep: candidate.currentInterviewStep,
            averageScore: candidate.averageScore
        }));
    } catch (error) {
        console.error('Error getting candidates for position:', error);
        throw error;
    }
}; 