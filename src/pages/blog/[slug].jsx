import { Layout } from '../../components'
import { BlogsService } from '../../services/blog.service'
import Image from 'next/image';
import { Avatar, Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Sidebar } from "../../components"
import { formatTimeAgo, readingTime } from '../../constants/constant';
import { useRouter } from 'next/router';
import SEO from '../../seo/seo';



const DetailedPage = ({ blog, latestBlogs, categories }) => {
  const router = useRouter()

  return (
    <SEO title={blog.title} description={blog.description} author={blog.author.name}>
      <Layout>
        <Box sx={{ display: 'flex', padding: { xs: '0', md: '30px 10px' }, flexDirection: { xs: 'column-reverse', md: 'row' }, justifyContent: 'space-between' }}>
          <Sidebar extraStyles={{ padding: { sm: '0 25px 25px', md: 0 } }} latestBlogs={latestBlogs} categories={categories} />
          <Box sx={{ background: '#fff', border: '1px solid #dedede', padding: { xs: '25px 30px', md: '25px 60px' }, borderRadius: { xs: '0', sm: '10px' }, margin: { xs: '0', sm: '25px', md: '0 50px', lg: '0 100px' } }}>
            <Box sx={{ borderRadius: '10px' }}>
              <Box sx={{ background: '#fff', display: 'flex', padding: '8px', borderRadius: '8px', gap: '10px', alignItems: 'center', cursor: 'pointer', marginBottom: '8px' }} onClick={() => router.push(`/author/${blog.author.slug}`)}>
                <Avatar alt={blog.author.name} src={blog.author.avatar.url} />
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>{blog.author.name}</Typography>
                  <Typography>{formatTimeAgo(new Date(blog.createdAt))} • {readingTime(blog.content.text)} min read</Typography>
                </Box>
              </Box>
              <Typography sx={{
                position: 'relative',
                fontSize: { xs: '2rem', md: '2.25rem', lg: '3rem' },
                fontWeight: { xs: '600', md: '700', lg: '800' },
                transition: 'all .3s ease',
                '&:hover::before': {
                  width: 'auto',
                  visibility: 'visible',
                  opacity: '1'
                },
                '&::before': {
                  width: 0,
                  overflow: 'hidden',
                  content: '"#"',
                  color: '#00ff00',
                  cursor: 'pointer',
                  visibility: 'hidden',
                  opacity: '0',
                  transition: 'all .3s ease'
                }
              }}> {blog.title}</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {blog.tag.split(", ").slice(0, 3).map((tagItem, idx) => (
                  <Button key={idx} sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }} onClick={() => router.push(`/tag/${tagItem}`)}>#{tagItem}</Button>
                ))}
              </Box>
              <Box sx={{ position: 'relative', width: '100%', height: { xs: '30vh', md: '50vh' }, marginTop: '1rem' }}>
                <Image fill alt={blog?.title} src={blog?.image?.url} style={{ objectFit: 'cover'}} />
              </Box>
            </Box>
            <Accordion sx={{ '&:before': { display: 'none', }, borderRadius: '10px', marginBottom: '15px', marginTop: '15px', border: '1px solid #dedede', boxShadow: 'none' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {blog.description ? <Typography>{blog.description}</Typography> : <Typography>there is no description</Typography>}
              </AccordionDetails>
            </Accordion>
            <div dangerouslySetInnerHTML={{ __html: blog.content.html }} className={'blog-content'} />
          </Box>
        </Box>
      </Layout>
    </SEO>
  )
}

export default DetailedPage

export const getServerSideProps = async ({ query }) => {
  const blog = await BlogsService.getDetailedBlog(query.slug)
  const latestBlogs = await BlogsService.getLatestBlogs()
  const categories = await BlogsService.getCategories()

  return {
    props: {
      blog,
      latestBlogs,
      categories,
    }
  }
}