import { Box, Button, Typography, Avatar,  } from "@mui/material"
import Image from "next/image";
import { useRouter } from 'next/router';
import { formatTimeAgo, readingTime } from '../constants/constant';



const Sidebar = ({latestBlogs, categories, extraStyles}) => {
	const router = useRouter()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', md: '40%' }, ...extraStyles }}>
            <Box sx={{position: 'sticky', top: '80px'}}>
                <Box sx={{ background: '#fff', display: 'flex', flexDirection: 'column', border: '1px solid #dedede', padding: '20px', borderRadius: '10px' }}>
                    <Typography sx={{ fontSize: '22px', fontWeight: '700' }} >Latest Blogs</Typography>
                    {latestBlogs?.map((latestBlog, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', borderRadius: '8px', padding: '8px', border: '1px solid #dedede'}}>
                            <Box sx={{position: 'relative', width: '100px', height: '100px', cursor: 'pointer'}} onClick={()=> router.push(`/blog/${latestBlog.slug}`)}>
                                <Image fill alt={latestBlog.title} src={latestBlog.image.url} style={{objectFit: 'cover'}}/>
                            </Box>
                            <Box sx={{padding: '15px 0 5px 0',display: 'flex', flexDirection: 'column', justifyContent: 'space-between',}}>
                                <Typography className='line-clamp' sx={{fontWeight: 600, cursor: 'pointer'}} onClick={()=> router.push(`/blog/${latestBlog.slug}`)}>{latestBlog.title}</Typography>
                                <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'row', cursor: 'pointer'}} onClick={()=> router.push(`/author/${latestBlog.author.slug}`)}>
                                    <Avatar alt={latestBlog.author.name} src={latestBlog.author.avatar.url} />
                                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                        <Typography sx={{fontWeight: 600}}>{latestBlog.author.name}</Typography>
                                        <Typography>{formatTimeAgo(new Date(latestBlog.createdAt))}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ background: '#fff', display: 'flex', flexDirection: 'column', border: '1px solid #dedede', marginTop: '15px', padding: '20px', borderRadius: '10px' }}>
                    <Typography sx={{ fontSize: '22px', fontWeight: '700' }}>Categories</Typography>
                    {categories?.map((category, idx) => (
                        <Button key={idx} sx={{justifyContent: 'flex-start'}} onClick={()=> router.push(`/category/${category.slug}`)}>{category.label}</Button>
                    ))}
                </Box>
            </Box>
        </Box >
    )
}

export default Sidebar