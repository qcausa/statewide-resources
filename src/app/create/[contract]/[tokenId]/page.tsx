"use client";

import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  mediaUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  isActive: z.boolean().default(true),
  allowComments: z.boolean().default(true),
  allowSharing: z.boolean().default(true),
});

export default function CreateTokenGatedContent() {
  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      mediaUrl: "",
      isActive: true,
      allowComments: true,
      allowSharing: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send this to your backend
  }

  return (
    <div className="from-theme-background via-theme-background-secondary to-theme-background min-h-screen bg-gradient-to-br p-8">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-0 bg-[#1E1B2E]/60 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Create Token Gated Content
            </CardTitle>
            <CardDescription className="text-gray-400">
              Add exclusive content for NFT #{params.tokenId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter content title"
                          className="border-purple-500/20 bg-[#1E1B2E]/60 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter content description"
                          className="border-purple-500/20 bg-[#1E1B2E]/60 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mediaUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Media URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter media URL"
                          className="border-purple-500/20 bg-[#1E1B2E]/60 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Enter the URL of your media content (video, image, etc.)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border border-purple-500/20 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-white">Active</FormLabel>
                          <FormDescription className="text-gray-400">
                            Make this content available to token holders
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="allowComments"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border border-purple-500/20 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-white">
                            Allow Comments
                          </FormLabel>
                          <FormDescription className="text-gray-400">
                            Enable commenting on this content
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="allowSharing"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border border-purple-500/20 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-white">
                            Allow Sharing
                          </FormLabel>
                          <FormDescription className="text-gray-400">
                            Allow token holders to share this content
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
                >
                  Create Content
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
