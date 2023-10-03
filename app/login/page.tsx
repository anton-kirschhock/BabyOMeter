"use client";
import { Button, Input, Link } from "@nextui-org/react";
import Messages from "./messages";
import { MdArrowBack } from "react-icons/md";
export default function Login() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link href="/">
        <MdArrowBack />
        Back
      </Link>

      <form
        className="flex-1 flex flex-col w-full justify-center text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <Input name="email" label="Email" variant="underlined" type="email" />
        <Input
          name="password"
          label="Password"
          variant="underlined"
          type="password"
        />

        <Button color="success" type="submit">
          Sign in
        </Button>
        <Button
          color="secondary"
          type="submit"
          formAction="/auth/sign-up"
          variant="bordered"
        >
          Sign up!
        </Button>
        <Messages />
      </form>
    </div>
  );
}
