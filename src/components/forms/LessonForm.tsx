"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField"; // Assuming this is your InputField component
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { lessonSchema, LessonSchema } from "@/lib/formValidationSchemas"; // Adjust this import
import { createLesson } from "@/lib/actions"; // Adjust according to your project
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LessonForm = ({
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
  } = useForm<LessonSchema>({
    resolver: zodResolver(lessonSchema),
  });

  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subjectId, setSubjectId] = useState(0); // Assuming subjectId is an integer
  const [classId, setClassId] = useState(0); // Assuming classId is an integer
  const [teacherId, setTeacherId] = useState(""); // Assuming teacherId is a string
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    createLesson({ ...data, name, day, startTime, endTime, subjectId, classId, teacherId })
      .then(() => {
        toast(`Lesson has been ${type === "create" ? "added" : "updated"}!`);
        setOpen(false);
        router.refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to save lesson.");
      });
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add New Lesson" : "Update Lesson"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Lesson Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          register={register}
          error={errors.name}
          required
        />
        <InputField
          label="Day"
          name="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          register={register}
          error={errors.day}
          required
        />
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Start Time"
          name="startTime"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          register={register}
          error={errors.startTime}
          required
        />
        <InputField
          label="End Time"
          name="endTime"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          register={register}
          error={errors.endTime}
          required
        />
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject ID"
          name="subjectId"
          type="number"
          value={subjectId}
          onChange={(e) => setSubjectId(Number(e.target.value))}
          register={register}
          error={errors.subjectId}
          required
        />
        <InputField
          label="Class ID"
          name="classId"
          type="number"
          value={classId}
          onChange={(e) => setClassId(Number(e.target.value))}
          register={register}
          error={errors.classId}
          required
        />
        <InputField
          label="Teacher ID"
          name="teacherId"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          register={register}
          error={errors.teacherId}
          required
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Add Lesson" : "Update Lesson"}
      </button>
    </form>
  );
};

export default LessonForm;
