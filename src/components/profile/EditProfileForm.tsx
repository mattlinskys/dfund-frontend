import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, VStack } from "@chakra-ui/layout";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/popover";
import { IconButton, Textarea, Button } from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";

interface EditProfileFormValues {
  name: string;
  avatarUri: string;
  description: string;
}

export interface EditProfileFormProps {
  defaultValues?: EditProfileFormValues;
  onSubmit: (values: EditProfileFormValues) => Promise<void>;
  // isSubmitting?: boolean;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  defaultValues,
  onSubmit,
  // isSubmitting,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Formik
      initialValues={
        defaultValues || { name: "", avatarUri: "", description: "" }
      }
      onSubmit={async (values) => {
        await onSubmit(values);
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("required"),
      })}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <VStack spacing={4}>
            <Field name="name">
              {({ field, meta }: FieldProps) => (
                <FormControl
                  id="name"
                  isRequired
                  isInvalid={!!(meta.error && meta.touched)}
                >
                  <FormLabel>
                    <FormattedMessage id="common.name" />
                  </FormLabel>
                  <Input autoFocus {...field} />
                  <FormErrorMessage>
                    {meta.error &&
                      formatMessage({
                        id: `profile.edit.form.validation.name:${meta.error}`,
                      })}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="avatarUri">
              {({ field, meta }: FieldProps) => (
                <FormControl
                  id="avatarUrl"
                  isInvalid={!!(meta.error && meta.touched)}
                >
                  <FormLabel display="flex" alignItems="center">
                    <FormattedMessage id="common.avatarUrl" />

                    <Popover>
                      <PopoverTrigger>
                        <IconButton
                          aria-label="Info"
                          size="xs"
                          ml={1.5}
                          icon={<InfoOutlineIcon />}
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverHeader>
                          <FormattedMessage id="profile.edit.form.avatar.popover.title" />
                        </PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                          <FormattedMessage id="profile.edit.form.avatar.popover.description" />
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </FormLabel>

                  <Input {...field} />
                </FormControl>
              )}
            </Field>

            <Field name="description">
              {({ field, meta }: FieldProps) => (
                <FormControl
                  id="description"
                  isInvalid={!!(meta.error && meta.touched)}
                >
                  <FormLabel>
                    <FormattedMessage id="common.description" />
                  </FormLabel>

                  <Textarea
                    {...field}
                    placeholder={formatMessage({
                      id: "profile.edit.form.description.placeholder",
                    })}
                  />
                </FormControl>
              )}
            </Field>

            <Box w="full" display="flex" justifyContent="flex-end">
              <Button type="submit" isLoading={isSubmitting}>
                <FormattedMessage id="common.save" />
              </Button>
            </Box>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileForm;
