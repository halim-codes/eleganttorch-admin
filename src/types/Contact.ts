export interface Contact {
    _id: string;
    email: string;
    phone: string;
    address: string;
    socialLinks: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
        youtube?: string;
        tiktok?: string;
    };

}
