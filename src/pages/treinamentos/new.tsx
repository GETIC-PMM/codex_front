import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  titulo: z.string(),
  resumo: z.string(),
  categoria_id: z.string(),
  tag_ids: z.array(z.string()),
  destaque_home: z.boolean(),
  autor_id: z.string(),
  duration: z.number(),
  data_publicacao: z.string(),
  capa: z.string(),
  corpo: z.string(),
});

const NovoTreinamento = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <div>
      <h1>Criar treinamento</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-10"
        >
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-between rounded-lg border p-4">
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default NovoTreinamento;
