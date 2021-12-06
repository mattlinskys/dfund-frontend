import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, SimpleGrid, VStack } from "@chakra-ui/layout";
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
import SlugInputField from "components/project/SlugInputField";

interface EditProjectFormValues {
  slug: string;
  name: string;
  avatarUri: string;
  bannerUri: string;
  description: string;
}

export interface EditProjectFormProps {
  defaultValues?: EditProjectFormValues;
  onSubmit: (values: EditProjectFormValues) => Promise<void>;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const { formatMessage } = useIntl();
  const isNew = !defaultValues;

  return (
    <Formik
      initialValues={{
        ...(defaultValues || {
          slug: "",
          name: "",
          avatarUri: "",
          bannerUri: "",
          description: "",
        }),
        isSlugUnique: true,
      }}
      onSubmit={async (values) => {
        await onSubmit(values);
      }}
      validationSchema={Yup.object().shape({
        slug: Yup.string()
          .required("required")
          .test("is-unique", "busy", (_, ctx) => ctx.parent.isSlugUnique),
        name: Yup.string().required("required"),
      })}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <VStack spacing={4}>
            <SimpleGrid w="full" columns={{ base: 1, md: 2 }} spacing={4}>
              <Field name="slug">
                {({ meta }: FieldProps) => (
                  <FormControl
                    id="slug"
                    isRequired
                    isInvalid={!!(meta.error && meta.touched)}
                  >
                    <FormLabel>
                      <FormattedMessage id="common.slug" />
                    </FormLabel>
                    <SlugInputField
                      name="slug"
                      uniqueFieldName="isSlugUnique"
                      currentSlug={defaultValues?.slug}
                      autoFocus={isNew}
                      isDisabled={!isNew}
                    />
                    <FormErrorMessage>
                      {meta.error &&
                        formatMessage({
                          id: `validation.slug:${meta.error}`,
                        })}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

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
                    <Input {...field} />
                    <FormErrorMessage>
                      {meta.error &&
                        formatMessage({
                          id: `validation.name:${meta.error}`,
                        })}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </SimpleGrid>

            <Field name="avatarUri">
              {({ field, meta }: FieldProps) => (
                <FormControl
                  id="avatarUro"
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

            <Field name="bannerUri">
              {({ field, meta }: FieldProps) => (
                <FormControl
                  id="bannerUri"
                  isInvalid={!!(meta.error && meta.touched)}
                >
                  <FormLabel>
                    <FormattedMessage id="common.bannerUri" />
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
                      id: "project.edit.form.description.placeholder",
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

export default EditProjectForm;
