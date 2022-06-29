import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';

import './Work.scss';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [works, setWorks] = useState([]);
  const [filterWorks, setFilterWorks] = useState([])
  const [animateCard, setAnimateCard] = useState({y:0, opacity: 1})

  useEffect(() => {
    const query = '*[_type == "works"]'
  
    client.fetch(query)
    .then((data) => {
      setWorks(data);
      setFilterWorks(data);
    })
  }, [])
  

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{y: 100, opacity: 0}]);

    setTimeout(() => {
      if(item === 'All') {
        setFilterWorks(works);
      }
      else {
        setFilterWorks(works.filter((w) => w.tags.includes(item)));
      }

      setAnimateCard([{y: 0, opacity: 1}]);
    }, 500);
  };

  return (
    <>
      <h2 className="head-text">
        My&nbsp;<span>Portfolio</span>&nbsp;Section
      </h2>
 {/* temporarily commented out because there are too few projects. */}
      <div className="app__work-filter">
        {/* {['All', 'C#', 'Web App', 'SQL'].map((item, index) => (
          <div
            key={`filter${index}`}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item? 'item-active': ''}`}
            >
              {item}
          </div>
        ))} */}
      </div>

      <motion.div
        animate={animateCard}
        transition={{duration: 0.5, delayChildren: 0.5}}
        className="app__work-portfolio"
      >
        {filterWorks.map((work, index) => (
          <div className="app__work-item app__flex" key={`work${index}`}>
            <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl)} alt={work.name} />

              <motion.div
                whileHover={{opacity: [0, 1]}}
                transition={{duration: 0.25, ease: 'easeOut', staggerChilderen: 0.5}}
                className="app__work-hover app__flex">
                  <a href={work.projectLink} target="_blank" rel='noreferrer'>
                    <motion.div
                      whileInView={{scale: [0,1]}}
                      whileHover={{scale: [0, 0.9]}}
                      transition={{duration: 0.25}}
                      className="app__work-hover-icon app__flex">
                        <AiFillEye />
                    </motion.div>
                    <div className="app__work-hover-desc app__flex">
                      Visit
                    </div>
                  </a>
                  <a href={work.codeLink} target="_blank" rel='noreferrer'>
                    <motion.div
                      whileInView={{scale: [0,1]}}
                      whileHover={{scale: [0, 0.9]}}
                      transition={{duration: 0.25}}
                      className="app__work-hover-icon app__flex">
                        <AiFillGithub />
                    </motion.div>
                    <div className="app__work-hover-desc app__flex">
                      GitHub
                    </div>
                  </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{marginTop: 10}}>{work.description}</p>

              <div className="app__work-tag app__flex">
                {work.tags.map((tag) => <p className="p-text" key={`tag${index}`}>{tag}&nbsp;</p>)}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__work'),
  'work',
  "app__primarybg"
  );
