import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Position {
    id?: number;
    companyId: number;
    interviewFlowId: number;
    title: string;
    description: string;
    status: string;
    isVisible: boolean;
    location: string;
    jobDescription: string;
    requirements?: string;
    responsibilities?: string;
    salaryMin?: number;
    salaryMax?: number;
    employmentType?: string;
    benefits?: string;
    companyDescription?: string;
    applicationDeadline?: Date;
    contactInfo?: string;

    constructor(data: any) {
        this.id = data.id;
        this.companyId = data.companyId;
        this.interviewFlowId = data.interviewFlowId;
        this.title = data.title;
        this.description = data.description;
        this.status = data.status ?? 'Draft';
        this.isVisible = data.isVisible ?? false;
        this.location = data.location;
        this.jobDescription = data.jobDescription;
        this.requirements = data.requirements;
        this.responsibilities = data.responsibilities;
        this.salaryMin = data.salaryMin;
        this.salaryMax = data.salaryMax;
        this.employmentType = data.employmentType;
        this.benefits = data.benefits;
        this.companyDescription = data.companyDescription;
        this.applicationDeadline = data.applicationDeadline ? new Date(data.applicationDeadline) : undefined;
        this.contactInfo = data.contactInfo;
    }

    async save() {
        const positionData: any = {
            companyId: this.companyId,
            interviewFlowId: this.interviewFlowId,
            title: this.title,
            description: this.description,
            status: this.status,
            isVisible: this.isVisible,
            location: this.location,
            jobDescription: this.jobDescription,
            requirements: this.requirements,
            responsibilities: this.responsibilities,
            salaryMin: this.salaryMin,
            salaryMax: this.salaryMax,
            employmentType: this.employmentType,
            benefits: this.benefits,
            companyDescription: this.companyDescription,
            applicationDeadline: this.applicationDeadline,
            contactInfo: this.contactInfo,
        };

        if (this.id) {
            return await prisma.position.update({
                where: { id: this.id },
                data: positionData,
            });
        } else {
            return await prisma.position.create({
                data: positionData,
            });
        }
    }

    static async findOne(id: number): Promise<Position | null> {
        const data = await prisma.position.findUnique({
            where: { id: id },
        });
        if (!data) return null;
        return new Position(data);
    }
    
    /**
     * Finds a position by its ID
     * @param id The ID of the position to find
     * @returns The position or null if not found
     */
    static async findById(id: number): Promise<Position | null> {
        return this.findOne(id);
    }
    
    /**
     * Gets all candidates for a specific position with their interview step info and average scores
     * @param positionId The ID of the position
     * @returns Array of candidate data with interview information
     */
    static async getCandidatesForPosition(positionId: number): Promise<any[]> {
        // Get all applications for this position with their candidate and interview data
        const applications = await prisma.application.findMany({
            where: {
                positionId: positionId
            },
            include: {
                candidate: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                },
                interviewStep: {
                    select: {
                        name: true
                    }
                },
                interviews: {
                    select: {
                        score: true
                    }
                }
            }
        });
        
        // Process the data to calculate average scores and format the output
        return applications.map(application => {
            // Calculate average score from all interviews
            const scores = application.interviews
                .filter(interview => interview.score !== null && interview.score !== undefined)
                .map(interview => interview.score as number);
                
            const averageScore = scores.length > 0
                ? scores.reduce((sum, score) => sum + score, 0) / scores.length
                : null;
                
            return {
                id: application.candidate.id,
                firstName: application.candidate.firstName,
                lastName: application.candidate.lastName,
                currentInterviewStep: application.interviewStep.name,
                averageScore: averageScore
            };
        });
    }
}

