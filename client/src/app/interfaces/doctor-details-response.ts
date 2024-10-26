export interface DoctorDetailsResponse {
    id: string,
    fullName: string,
    specialtyName: string,
    imgUrl: string | null | undefined,
    room: string,
    birthDay: Date,
    education: string,
    employedSince: Date
}
