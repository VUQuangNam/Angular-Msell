export interface Product {
    product_id: number;
    city_id: string;
    district_id: string;
    wards_id: string;
    street_id: string;
    project_id: string;
    title: string;
    images: [
        string
    ];
    description: string;
    location: {
        latitude: string,
        longitude: string
    };
    coordinates: {
        latitude: string,
        longitude: string
    };
    properties: {
        address: string,
        direction_balcony: string,
        type_of_post: number,
        price: number,
        acreage: number,
        category: string,
        facade: number,
        road_wide: number
    };
    owner_info: {
        owner_type: string,
        owner_id: string
    };
    package_post_info: {
        package_type: string,
        number_of_days: number
    };
    date_created: Date;
}
