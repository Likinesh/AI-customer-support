import React from 'react'
import { motion } from "motion/react";

const Features = ({ features }: { features: { name: string; description: string }[] }) => {
  return (
    <section
        className="bg-zinc-50 py-28 px-6 border-t border-zinc-200"
        id="feature"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-semibold text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{once: false}}
            transition={{ duration: 0.7 }}
          >
            Why Business Choose Us?
          </motion.h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
              {
                features.map((feature,index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{once: false}}
                    transition={{ delay: index * 0.2, duration: 0.7 }}
                    className="bg-white rounded-2xl p-8 shadow-lg border border-zinc-200"
                  >
                    <h3 className="text-xl font-medium mb-2">{feature.name}</h3>
                    <p className="text-zinc-600">{feature.description}</p>
                  </motion.div>
                ))
              }
          </div>
        </div>
      </section>
  )
}

export default Features
