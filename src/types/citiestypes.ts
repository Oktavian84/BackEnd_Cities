export type CreateCity = {
    img_url: string;
    city_name: string;
    city_location: string;
}

export type UpdateCityData = Partial<CreateCity>;
