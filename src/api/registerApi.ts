import axios from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ISignUpForm } from "@/interfaces/interfaces";



const signUpUser = async (data: ISignUpForm): Promise<any> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/register`, data, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    });
    return response.data;
}


export const useRegister = (): UseMutationResult<any, Error, ISignUpForm>  => {
    return useMutation({
        mutationFn: signUpUser
    });
}