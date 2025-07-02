"use client"

import {useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Star, Plus, Edit, Trash2} from "lucide-react"

export default function ReviewsSection({book, onUpdateReviews}) {
    const [reviews, setReviews] = useState(book.reviews || [])
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [editingIndex, setEditingIndex] = useState(null)
    const [newReview, setNewReview] = useState({rating: 5, comment: ""})

    //Add Review
    const addReview = async (bookId, rating, comment) => {
        await fetch('/api/books', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({bookId, rating, comment}),
        });
    }

    //Update Review
    const updateReview = async (id, rating, comment) => {
        await fetch('/api/books', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, rating, comment}),
        })
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const handleAddReview = () => {
        if (newReview.comment.trim()) {
            const review = {
                ...newReview,
                createdAt: new Date().toISOString(),
            }
            addReview(book.id, review.rating, review.comment)
            const updatedReviews = [...reviews, review]
            setReviews(updatedReviews)
            onUpdateReviews(updatedReviews)
            setNewReview({rating: 5, comment: ""})
            setIsAddDialogOpen(false)
        }
    }

    const handleEditReview = () => {
        if (editingIndex !== null && newReview.comment.trim()) {
            const updatedReviews = reviews.map((review, index) =>
                index === editingIndex ? {...review, rating: newReview.rating, comment: newReview.comment} : review,
            )
            updateReview(newReview.id, newReview.rating, newReview.comment)
            setReviews(updatedReviews)
            onUpdateReviews(updatedReviews)
            setNewReview({rating: 5, comment: ""})
            setIsEditDialogOpen(false)
            setEditingIndex(null)
        }
    }

    const handleDeleteReview = (index) => {
        const updatedReviews = reviews.filter((_, i) => i !== index)
        setReviews(updatedReviews)
        onUpdateReviews(updatedReviews)
    }

    const startEdit = (index) => {
        const review = reviews[index]
        setNewReview({id: review.id, rating: review.rating, comment: review.comment})
        setEditingIndex(index)
        setIsEditDialogOpen(true)
    }

    const renderStars = (rating, interactive = false, onRatingChange) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-5 h-5 ${
                        star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
                    onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
                />
            ))}
        </div>
    )

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Reviews</CardTitle>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2"/>
                                Add Review
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add a Review</DialogTitle>
                                <DialogDescription>Share your thoughts about this book</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="rating">Rating</Label>
                                    <div className="mt-2">
                                        {renderStars(newReview.rating, true, (rating) => setNewReview((prev) => ({...prev, rating})))}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Textarea
                                        id="comment"
                                        placeholder="Write your review..."
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview((prev) => ({...prev, comment: e.target.value}))}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleAddReview}>Add Review</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                {reviews.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <Star className="w-8 h-8 text-gray-300"/>
                        </div>
                        <p className="text-lg">No reviews yet</p>
                        <p className="text-sm">Be the first to review this book!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        {renderStars(review.rating)}
                                        <span className="text-sm text-gray-600">{formatDate(review.createdAt)}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => startEdit(index)}>
                                            <Edit className="w-4 h-4"/>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteReview(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4"/>
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Review</DialogTitle>
                        <DialogDescription>Update your review for this book</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit-rating">Rating</Label>
                            <div className="mt-2">
                                {renderStars(newReview.rating, true, (rating) => setNewReview((prev) => ({...prev, rating})))}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="edit-comment">Comment</Label>
                            <Textarea
                                id="edit-comment"
                                placeholder="Write your review..."
                                value={newReview.comment}
                                onChange={(e) => setNewReview((prev) => ({...prev, comment: e.target.value}))}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditDialogOpen(false)
                                setEditingIndex(null)
                                setNewReview({rating: 5, comment: ""})
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleEditReview}>Update Review</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

