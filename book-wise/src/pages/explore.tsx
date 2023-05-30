import { ExploreContainer, TagsContainer, BooksGrid } from "@/styles/pages/explore";
import { NextPageWithLayout } from "./_app";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { PageTitle } from "@/components/ui/PageTitle";
import { Binoculars, MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "@/components/ui/form/Input";
import { useState } from "react";
import { Tag } from "@/components/ui/Tag";
import { BookCard, BookWithAvgRating } from "@/components/BookCard";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";

const ExplorePage: NextPageWithLayout = () => {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: categories } = useQuery<Category[]>(["categories"], async () => {
    const { data } = await api.get("/books/categories")
    return data?.categories ?? []
  })

  const { data: books } = useQuery<BookWithAvgRating[]>(["books", selectedCategory], async () => {
    const { data } = await api.get("/books/", {
      params: {
        category: selectedCategory
      }
    })
    return data?.books ?? []
  })

  const filteredBooks = books?.filter(book => {
    return book.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || book.author.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  })

  return (
    <ExploreContainer>
      <header>
        <PageTitle title="Explorar" icon={<Binoculars size={32} />} />

        <Input
         placeholder="Buscar livro ou autor" 
         icon={<MagnifyingGlass size={32} />} 
         css={{
          maxWidth: 433
         }}
         value={search}
         onChange={({ target }) => setSearch(target.value)}
         />
      </header>

      <TagsContainer>
        <Tag active={selectedCategory === null} onClick={() => setSelectedCategory(null)}>
          Tudo
        </Tag>
         {categories?.map(category => (
          <Tag key={category.id} active={selectedCategory === category.id} onClick={() => setSelectedCategory(category.id)}>
            {category?.name}
          </Tag>
         ))}
      </TagsContainer>

      <BooksGrid>
        {filteredBooks?.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </BooksGrid>
    </ExploreContainer>
  )
}

ExplorePage.getLayout = (page) => {
  return (
    <DefaultLayout title="Explorar">
      {page}
    </DefaultLayout>
  )
}

export default ExplorePage;