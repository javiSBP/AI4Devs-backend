import { Request, Response } from 'express';
import { getPositionCandidates as getPositionCandidatesService } from '../../application/services/positionService';

export const getPositionCandidates = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);
        
        if (isNaN(positionId)) {
            return res.status(400).json({ error: 'Invalid position ID format' });
        }
        
        const candidates = await getPositionCandidatesService(positionId);
        
        if (!candidates || candidates.length === 0) {
            return res.status(404).json({ message: 'No candidates found for this position' });
        }
        
        res.json(candidates);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
}; 