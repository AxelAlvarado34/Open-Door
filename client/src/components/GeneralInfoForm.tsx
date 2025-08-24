import { useForm } from "react-hook-form";
import style from '../styles/GeneralInfoForm.module.css';
import { IoMdAddCircle } from "react-icons/io";
import type { PropertyFormData } from "../types";
import { propertyStore } from "../store/PropertyStore";

type GeneralInfoFormProps = {
    address: string;
    setAddress: (addr: string) => void;
};


export default function GeneralInfoForm({ address, setAddress }: GeneralInfoFormProps) {

    const createPublication = propertyStore(state => state.createPublication);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset

    } = useForm<PropertyFormData>();

    const onSubmit = (data: PropertyFormData) => {
        createPublication(data)
        reset();
    };

    return (
        <div className={style.add_form_content}>
            <div className={style.add_header}>
                <h2 className={style.heading}> <IoMdAddCircle /> General Information</h2>
                <p className={style.description}>
                    Add the basic details of your property to start your listing
                    and make it easier for potential buyers to find.
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>

                <div className={style.formGroup}>
                    <input
                        id="title"
                        {...register("title", { required: "Title is required" })}
                        className={style.input_add + (errors.title ? ` ${style.inputError}` : '')}
                        placeholder={errors.title ? errors.title.message : "Listing Title"}
                    />
                </div>

                <div className={style.formGroup}>
                    <textarea
                        id="description"
                        {...register("description", { required: "Description is required" })}
                        className={style.input_add + (errors.description ? ` ${style.inputError}` : '')}
                        placeholder={errors.description ? errors.description.message : "Listing Description"}
                    />
                </div>

                <div className={style.formGroup}>
                    <input
                        id="location"
                        readOnly
                        placeholder={errors.location ? errors.location.message : 'Set location property'}
                        {...register("location", { required: "Location is required" })}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={style.input_add + (errors.location ? ` ${style.inputError}` : '')}
                    />
                </div>


                <div className={style.formGroup}>
                    <select
                        id="category"
                        {...register("category", { required: "Category is required" })}
                        className={style.input_add + (errors.category ? ` ${style.inputError}` : '')}
                    >
                        <option value="">{errors.category ? errors.category.message : 'Select a category'}</option>
                        <option value="Houses">Houses</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Warehouse">Warehouse</option>
                        <option value="Lots">Lots</option>
                        <option value="Cabins">Cabins</option>
                    </select>
                </div>


                <div className={style.group_line}>
                    <div className={style.formGroup}>
                        <input
                            id="price"
                            type="number"
                            placeholder={errors.price ? errors.price.message : 'Price USD'}
                            {...register("price", {
                                required: "Price is required",
                                min: { value: 1, message: "Price must be greater than 0" }
                            })}
                            className={style.input_add + (errors.price ? ` ${style.inputError}` : '')}
                        />
                    </div>


                    <div className={style.formGroup}>
                        <input
                            id="bedrooms"
                            type="number"
                            placeholder={errors.bedrooms ? errors.bedrooms.message : 'Bedrooms'}
                            {...register("bedrooms", { required: "Bedroom's is required", min: { value: 0, message: "Must be at least 0" } })}
                            className={style.input_add + (errors.bedrooms ? ` ${style.inputError}` : '')}
                        />
                    </div>
                </div>


                <div className={style.group_line}>
                    <div className={style.formGroup}>
                        <input
                            id="parking"
                            type="number"
                            placeholder={errors.parking ? errors.parking.message : 'Parking Spots'}
                            {...register("parking", { required: "Parking's is required", min: { value: 0, message: "Must be at least 0" } })}
                            className={style.input_add + (errors.parking ? ` ${style.inputError}` : '')}
                        />
                    </div>


                    <div className={style.formGroup}>
                        <input
                            id="bathrooms"
                            type="number"
                            placeholder={errors.bathrooms ? errors.bathrooms.message : 'Bathrooms'}
                            {...register("bathrooms", { required: "Number is required", min: { value: 0, message: "Must be at least 0" } })}
                            className={style.input_add + (errors.bathrooms ? ` ${style.inputError}` : '')}
                        />
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setValue("image", e.target.files[0]);
                        }
                    }}
                />
                <button type="submit" className={style.submitButton}>Submit</button>
            </form>
        </div>
    );
}
