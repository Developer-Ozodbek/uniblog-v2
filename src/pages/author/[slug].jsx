import { BlogsService } from "../../services/blog.service"
import { Content, Layout } from "../../components"
import { Box, Typography, Avatar } from "@mui/material"
import SEO from '../../seo/seo';


const Author = ({authorBlogs}) => {
  console.log(authorBlogs)


  return (
    <SEO title={`${authorBlogs[0]?.author?.name}'s blogs`} description={authorBlogs.description} author={authorBlogs[0]?.author?.name}>
      <Layout>
        <Box sx={{position: 'sticky', top: '60px', zIndex: '800', display: 'flex', alignItems: 'center', background: '#504A4B', width: '100%', height: '100px', borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px'}}>
          <Avatar sx={{height: '100%', width: '100px'}} alt={authorBlogs[0]?.author.name} src={authorBlogs[0]?.author.avatar.url} />
          <Typography sx={{fontSize: '26px', fontWeight: 800, color: '#fff', marginLeft: '20px'}}>{authorBlogs[0]?.author?.name} • {authorBlogs.length} blogs</Typography>
        </Box>
        <Box sx={{
              display: 'flex',
              gap: '20px',
              flexDirection: 'column',
              padding: '20px',
              justifyContent: 'center',
              alignItems: 'center'
        }}>
          <Content blogs={authorBlogs}/>
        </Box>
      </Layout>
    </SEO>

  )
}

export default Author

export const getServerSideProps = async ({query}) => {
  const authorBlogs = await BlogsService.getAllBlogsByAuthor(query.slug)

  return {
    props: {
      authorBlogs
    }
  }
}
