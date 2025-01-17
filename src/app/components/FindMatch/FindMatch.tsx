import Image from 'next/image'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import jobmatch from '../../../../public/jobmatch.jpg'

export default function FindMatch() {
    return (
        <section className="container max-w-7xl mx-auto px-4 py-12 md:py-6">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-12 items-center gap-12">
               
                <div className="relative w-full h-64 md:h-[400px] lg:h-[600px]">
                    <Image
                        src={jobmatch}
                        alt="Job search illustration showing people connecting online"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="space-y-8">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                        Find your Match                    </h1>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        To start searching for jobs, you can attend job fairs online or in person, use job boards and career websites or reach out directly to recruiters in a targeted company to broaden your network.
                    </p>

                   

                    <Button className="bg-[#1e2b58] hover:bg-[#2a3b6e] px-8 py-5 rounded-xl text-lg">
                        Discover More
                    </Button>
                </div>

            
            </div>
        </section>
    )
}
