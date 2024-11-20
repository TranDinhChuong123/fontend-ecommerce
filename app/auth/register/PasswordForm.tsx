import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { FC } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";


const PasswordForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            'password': "",
            'confirmPassword': "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const { password, confirmPassword } = data;
        if (password !== confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp!");
            return;
        }

        
        toast.success("Thiết lập mật khẩu thành công!");
    };

    return (
        <div className="flex flex-col items-center">
            <Heading title="Thiết Lập Mật Khẩu" />
            <Input
                id="password"
                label="Mật Khẩu"
                type="password"
                required
                errors={errors}
                register={register}
            />
            <Input
                id="confirmPassword"
                label="Xác Nhận Mật Khẩu"
                type="password"
                required
                errors={errors}
                register={register}
            />
            <Button
                label="Thiết Lập Mật Khẩu"
                onClick={handleSubmit(onSubmit)}
            />
        </div>
    );
};

export default PasswordForm;
