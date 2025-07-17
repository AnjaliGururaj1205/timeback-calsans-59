import React, { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  childFirstName: z.string().min(1, "Child's name is required"),
  age: z.coerce.number().min(3, "Age must be at least 3").max(18, "Age must be 18 or under"),
  grade: z.string().min(1, "Please select a grade"),
  location: z.string().min(1, "Location is required"),
  parentName: z.string().min(1, "Your name is required"),
  phone: z.string().optional(),
  additionalInfo: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const interestOptions = [
  "Timeback Homeschool Program",
  "Timeback Afterschool Program", 
  "Finding a Timeback School",
  "Not sure yet"
]

const gradeOptions = [
  "Pre-K", "Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade",
  "5th Grade", "6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade",
  "11th Grade", "12th Grade", "Not Enrolled"
]

export function MultiStepForm() {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: [],
      childFirstName: "",
      age: undefined,
      grade: "",
      location: "",
      parentName: "",
      phone: "",
      additionalInfo: "",
    },
  })

  const { watch, setValue, getValues } = form

  const interests = watch("interests")

  const handleInterestChange = (interest: string, checked: boolean) => {
    const currentInterests = getValues("interests")
    if (checked) {
      setValue("interests", [...currentInterests, interest])
    } else {
      setValue("interests", currentInterests.filter(i => i !== interest))
    }
  }

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data)
    // Here you would typically send the data to your backend
    setIsOpen(false)
    form.reset()
  }

  const resetForm = () => {
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetForm()
    }}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-105 font-system"
        >
          Let's Talk About My Kid
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground font-system">
            Tell Us About Your Child
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
              {/* Section 1: Interests */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground font-system border-b border-gray-200 pb-2">
                  What are you interested in?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select one or more options that interest you
                </p>
                <FormField
                  control={form.control}
                  name="interests"
                  render={() => (
                    <FormItem>
                      <div className="space-y-3">
                        {interestOptions.map((interest) => (
                          <div key={interest} className="flex items-center space-x-2">
                            <Checkbox
                              id={interest}
                              checked={interests.includes(interest)}
                              onCheckedChange={(checked) => 
                                handleInterestChange(interest, checked as boolean)
                              }
                            />
                            <label
                              htmlFor={interest}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {interest}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Section 2: Child's Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground font-system border-b border-gray-200 pb-2">
                  Your Child's Information
                </h3>
                
                <FormField
                  control={form.control}
                  name="childFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Child's First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your child's first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter age" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Grade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select current grade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gradeOptions.map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Where do you live?</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter zip code or city, state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Section 3: Parent Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground font-system border-b border-gray-200 pb-2">
                  Your Contact Information
                </h3>
                
                <FormField
                  control={form.control}
                  name="parentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Section 4: Additional Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground font-system border-b border-gray-200 pb-2">
                  Additional Information
                </h3>
                
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anything else you'd like us to know? (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your child's interests, learning style, or any specific needs..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  className="bg-brand-primary hover:bg-brand-primary/90 px-8 py-2"
                >
                  Submit
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}