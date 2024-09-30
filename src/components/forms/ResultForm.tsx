"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField"; // Assuming this is your InputField component
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { resultSchema, ResultSchema } from "@/lib/formValidationSchemas"; // Ensure this is correct
import { createResult } from "@/lib/actions"; // Adjust according to your project
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ResultForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResultSchema>({
    resolver: zodResolver(resultSchema),
  });

  const [studentId, setStudentId] = useState("");
  const [score, setScore] = useState(0);
  const [exam, setExam] = useState("");
  const [assignment, setAssignment] = useState("");
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    createResult({ ...data, studentId, score, exam, assignment })
      .then(() => {
        toast(`Result has been ${type === "create" ? "added" : "updated"}!`);
        setOpen(false);
        router.refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to save result.");
      });
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add New Result" : "Update Result"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Student ID"
          name="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          register={register}
          error={errors.studentId}
          required
        />
        <InputField
          label="Score"
          name="score"
          type="number"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          register={register}
          error={errors.score}
          required
        />
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Exam"
          name="exam"
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          register={register}
          error={errors.exam}
          required
        />
        <InputField
          label="Assignment"
          name="assignment"
          value={assignment}
          onChange={(e) => setAssignment(e.target.value)}
          register={register}
          error={errors.assignment}
          required
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Add Result" : "Update Result"}
      </button>
    </form>
  );
};

export default ResultForm;
