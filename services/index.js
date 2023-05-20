import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getCategories = async () => {
  const query = gql`
    query GetGategories {
        categories {
          name
          slug
        }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getSimilarPosts = async (slug , categories) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};





// import { request, gql } from "graphql-request";
// import { Result } from "postcss";

// const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// // for PostCard
// export const getPosts = async () => {
//     const query = gql`
//         query MyQuery {
//             postsConnection {
//                 edges {
//                     node {
//                         author {
//                             bio
//                             name
//                             id
//                             photo {
//                                 url
//                             }
//                         }
//                         createdAt
//                         slug
//                         title
//                         excerpt
//                         featuredImage {
//                             url
//                         }
//                         categories {
//                             name
//                             slug
//                         }
//                     }
//                 }
//             }
//         }

//     `

// const result = await request(graphqlAPI , query)

// return result.postsConnection.edges;

// // request('https://api.spacex.land/graphql/', query).then((data) => console.log(data))
// };
// // till this






// // for PostWidget
// export const getRecentPosts = async () => {
//     const query = gql`
//         query GetPostDetails() {
//             posts(
//                 orderBy: createdAt_ASC, 
//                 last: 3) 
//                 {
//             title
//             featuredImage {
//                 url
//             }
//             slug
//             createdAt
//             }
//         }
//     `

//     const result = await request(graphqlAPI , query);
//     return result.posts;
// }





// export const getSimilarPosts = async (slug, categories) => {
//     const query = gql`
//     query GetPostDetails($slug: String!, $categories: [String!]) {
//         posts(
//           where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
//           last: 3
//         ) {
//           title
//           featuredImage {
//             url
//           }
//           createdAt
//           slug
//         }
//       }
//     `;
//     const result = await request(graphqlAPI, query, { slug, categories });
  
//     return result.posts;
// }
// // till this






// // for Categories
// export const getCategories = async () => {
//     const query = gql`
//         query GetCategories {
//             categories {
//                 name
//                 slug
//             }
//         }
    
//     `
//     const result = await request(graphqlAPI, query);
  
//     return result.categories;

// }
// // till this





// // for the PostDetail page
// export const getPostDetails = async (slug) => {
//     const query = gql`
//     query getPostDetails( $slug: String!) {     
//         post(where: {slug: $slug }) {           
//             author {
//                     bio
//                     name
//                     id
//                     photo {
//                         url
//                     }
//                 }
//                 createdAt
//                 slug
//                 title
//                 excerpt
//                 featuredImage {
//                     url
//                 }
//                 categories {
//                     name
//                     slug
//                 }
//                 content {
//                     raw
//                 }
//             }
//         }
        
//         `;
//         const result = await request(graphqlAPI, query, { slug });
        
//         return result.post;
//     }
    
//     //thie 3rd line in above code segment means the slug used as a parameter is a String --> ( $slug: String!)
//     //the 4th line means only fetching those posts where the slug matches the queried slug ---> post(where: {slug: $slug })


//     // till here


    




// // request to our own backend api in pages/api/comments.js
// export const submitComment = async (obj) => {
//     const result = await fetch('/api/comments', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(obj),
//     })
    
//     return result.json();
// }








// // for Comments
// export const getComments = async (slug) => {
//     const query = gql`
//         query GetComments($slug: String!) {
//             comments(where: {post: {slug: $slug}}) {
//                 name
//                 createdAt
//                 comment
//             }
//         }
    
//     `
//     const result = await request(graphqlAPI, query, { slug });
  
//     return result.comments;

// }
