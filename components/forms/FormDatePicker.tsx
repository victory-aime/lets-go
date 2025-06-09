// import React, { useState } from "react";
// import { FormikContextType, useFormikContext } from "formik";
// import { getI18n, useTranslation } from "react-i18next";
// import {
//   TouchableOpacity,
//   ViewStyle,
//   StyleProp,
//   TextStyle,
// } from "react-native";
// import DatePicker from "react-native-date-picker";
// import BaseText, {
//   TextVariant,
//   TextWeight,
// } from "_components/BaseText/BaseText";
// import { CalendarIcon } from "_assets/svg";
// import { Colors } from "_theme/variables";
// import {
//   FormControl,
//   IInputProps,
//   WarningOutlineIcon,
//   View,
// } from "native-base";

// export interface DatePickerProps
//   extends Omit<IInputProps, "onChange" | "onBlur" | "onFocus"> {
//   id: string;
//   inputRef?: React.RefObject<any>;
//   label?: string;
//   initialDate?: Date;
//   style?: StyleProp<ViewStyle>;
//   mode?: "date" | "time" | "datetime";
//   maximumDate?: Date;
//   minimumDate?: Date;
//   onFilter?: boolean;
//   disabled?: boolean;
//   placeholder?: string;
//   localErrorMsg?: string;
//   onChange?: (date: Date) => void;
// }

// const FormDatePicker: React.FC<DatePickerProps> = ({
//   onChange,
//   id,
//   disabled = false,
//   label,
//   initialDate,
//   style,
//   mode = "date",
//   maximumDate,
//   minimumDate,
//   onFilter = false,
//   placeholder,
//   localErrorMsg,
//   ...inputProps
// }) => {
//   const formContext: FormikContextType<any> = useFormikContext();
//   const [open, setOpen] = useState(false);
//   const { t } = useTranslation();
//   const currentLanguage = getI18n().language;
//   const { error } = formContext.getFieldMeta(id);
//   const hasError = !!error;
//   const fieldError = hasError ? error : undefined;

//   const dateValue = formContext.values[id];
//   const isDateSelected = dateValue instanceof Date;
//   const _date = isDateSelected
//     ? dateValue.toLocaleDateString()
//     : onFilter
//     ? "JJ/MM/AAAA"
//     : placeholder || "";

//   return (
//     <FormControl isInvalid={!!hasError}>
//       {!!label && (
//         <View mb={"10px"}>
//           <BaseText variant={TextVariant.M} weight={TextWeight.Regular}>
//             {label}
//           </BaseText>
//         </View>
//       )}

//       <View style={[{ minWidth: "100%" }, style]}>
//         <TouchableOpacity
//           onPress={() => !disabled && setOpen(true)}
//           activeOpacity={0.8}
//           style={[
//             {
//               borderColor: fieldError ? Colors.red : Colors.gray,
//               borderWidth: 1,
//               borderRadius: 12,
//               height: 60,
//               paddingLeft: 15,
//               paddingRight: 18,
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//             },
//           ]}
//           {...inputProps}
//         >
//           <BaseText
//             variant={TextVariant.M}
//             color={isDateSelected ? Colors.black : "light.400"}
//           >
//             {_date || placeholder}
//           </BaseText>
//           <CalendarIcon />
//         </TouchableOpacity>
//       </View>

//       <DatePicker
//         locale={currentLanguage}
//         modal
//         mode={mode}
//         open={open}
//         date={initialDate ?? new Date()}
//         minimumDate={minimumDate}
//         maximumDate={maximumDate}
//         onCancel={() => {
//           setOpen(false);
//           formContext.setFieldValue(id, "");
//         }}
//         onConfirm={(date) => {
//           if (onChange) onChange(date);
//           setOpen(false);
//           formContext.setFieldValue(id, date);
//         }}
//         cancelText={t("COMMON.CANCEL")}
//         confirmText={t("COMMON.CONFIRM")}
//       />

//       {!!fieldError && (
//         <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
//           {t(fieldError) ?? ""}
//         </FormControl.ErrorMessage>
//       )}
//     </FormControl>
//   );
// };

// export default React.memo(FormDatePicker);
