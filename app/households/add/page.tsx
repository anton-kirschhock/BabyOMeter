"use client";
import { Database } from "@/types/supabase";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, Input } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Field, FieldProps, Form, Formik } from "formik";

export default function AddHousehold({}) {
  const supabase = createClientComponentClient<Database>();

  return (
    <>
      <Card className="m-5">
        <CardHeader className="flex flex-col justify-items-start justify-start">
          <h1>Add a new Household</h1>
          <h6>You will be automatically added as owner</h6>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: "",
            }}
            initialErrors={{}}
            validate={(values) => {
              const errors: { [key: string]: string | undefined } = {};
              if ((values?.name ?? "").trim() === "") {
                errors.name = "Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const owner_id = (await supabase.auth.getUser()).data.user!.id!;
              const model = {
                ...values,
                owner_id,
              };
              const res = await supabase.from("Households").insert(model);
              if (res.error === null) {
                await supabase.from("HouseholdMembers").insert({
                  household_id: (res.data as any).id,
                  user_id: owner_id,
                });
              } else {
                alert(res.error.message);
              }
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <Field name="name">
                  {({ field }: FieldProps<any>) => (
                    <Input
                      variant="underlined"
                      className="my-5"
                      label="Name"
                      errorMessage={
                        errors && errors["name"] ? errors["name"] : undefined
                      }
                      {...field}
                    />
                  )}
                </Field>
                <Button
                  type="submit"
                  color="success"
                  className="my-5"
                  disabled={
                    isSubmitting ||
                    (errors !== undefined &&
                      Object.keys(errors).some(
                        (e) =>
                          (errors as Record<string, string>)[e] !== undefined
                      ))
                  }
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
}
