import { cn } from "@/lib/utils";
import AddFileIcon from "../../assets/file-blank-add-plus.png";
import { Button, buttonVariants } from "./button";

import { useState } from "react";

type DocumentInputProps = {
  labelHtmlFor: string;
  file: string;
  onFileChange: (file: string) => void;
};

const DocumentInput = ({
  labelHtmlFor,
  file,
  onFileChange,
}: DocumentInputProps) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      onFileChange(base64);
    };
    reader.readAsDataURL(file);
  };

  console.log(file);

  return (
    <div className="rounded-md p-2 flex justify-between mt-2 gap-2">
      <div className="flex gap-3 items-center">
        <div className="p-3 text-3xl rounded-md border border-zinc-600/10">
          <img src={AddFileIcon} alt="" className={"opacity-50"} />
        </div>
        <div className="flex flex-col text-sm">
          {file ? (
            <span className="text-zinc-500">{fileName}</span>
          ) : (
            <>
              <span className="text-zinc-500">Selecione um arquivo...</span>
              <span className="text-zinc-500">
                O arquivo pode ter até 100 mb
              </span>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {file ? (
          <Button
            variant={"destructive"}
            onClick={() => {
              setFileName(null);
              onFileChange("");
            }}
          >
            Cancelar
          </Button>
        ) : (
          <label
            htmlFor={labelHtmlFor}
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "cursor-pointer"
            )}
          >
            Selecione o arquivo
          </label>
        )}
        <input
          className="hidden"
          type="file"
          id={labelHtmlFor}
          accept=".png, .jpg, .jpeg"
          onClick={(event) => {
            event.currentTarget.value = "";
          }}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              setFileName(file.name);
              handleFileChange(file);
            }
          }}
          placeholder="Selecione o arquivo"
        />
      </div>
    </div>
  );
};

export default DocumentInput;
