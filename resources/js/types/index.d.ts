export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    };


    import { ReactNode } from "react";

    export interface User {
        id: number;
        name: string;
        email: string;
    }

    interface Auth {
    export     user: User;
        admin: object | null;
    }

    export declare interface Flash {
        type: "success" | "error";
        message?: string | null;
    }

    export interface InertiaProps {
        auth: Auth;
        flash: Flash;
        [key: string]: any;
    }

    export interface CardProps {
        icon: ReactNode;
        number: number | ReactNode;
        bg: string;
        label: ReactNode;
    }




declare type TChartData = {
    dtype: string;
    dname: string;
    total: number;
    fill: string;
};

export declare interface CustomerChartProp {
    chartConfig: ChartConfig;
    chartData: TChartData[];
    title: string;
    description?: string;
    footer?: string;
}

export interface IItem {
  id: string;
  name: string;
  description: string;
  created_at: string; 
  updated_at: string; 
}


export interface IAdmin {
    invoiceDate: string;
    customer_id: string;
    customerInvoices: [] | null;
}

import { ChartConfig } from "@/components/ui/chart";



declare type User = {
    $id: string;
    email: string;
    userId: string;
    dwollaCustomerUrl: string;
    dwollaCustomerId: string;
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
};
export interface ISidebarLinks {
    imgURL: string;
    imgUrlActive: string;
    route: string;
    label: string;
    filter?: string[];
}


export interface IUserSignupData {
    firstname: string;
    lastname: string;
    email: string;
    // street: string;
    // city: string;
    // region: string;
    // country: string;
    password: string;
    password_confirmation: string;
}
export interface ISigninData {
    email: string;
    password: string;
    [key: string]: string | boolean | undefined;
}

export interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    email_verified_at: string | null;
    street: string | null;
    city: string | null;
    region: string | null;
    country: string | null;
    gender: string | null;
    profilePic: string;
}

export interface IIconProps {
    color: string;
    width: string;
    height: string;
}

export interface IImage {
    id: number;
    url: string;
    property_id: number;
    created_at: string;
    updated_at: string;
}

export interface IProperty {
    id: number;
    title: string;
    code: string;
    description: string;
    type: string;
    price: string;
    category: string;
    size: string;
    bedroom: string;
    bathroom: string;
    furnishing: string;
    yearOfCons: string;
    street: string;
    region: string;
    city: string;
    created_at: string;
    updated_at: string;
    is_visible: number;
    images: IImage[];
}

export interface INotification{
  id: number;
  name: string;
  email: string;
  message: string;
  phone: string;
  property_id: number;
  created_at: string;
  updated_at: string;
  property: IProperty;
}


export interface IPropertySearchFormData {
  category: string;
  location: string;
}