import React, { useEffect, useRef, useState } from 'react'
import { useTopbar } from '../../context/TopbarContext'
import './Topbar.css'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const TopbarSelect = ({ id, label, value, onChange, options }) => {
  const wrapperRef = useRef(null)
  const buttonRef = useRef(null)
  const listboxRef = useRef(null)
  const [open, setOpen] = useState(false)

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  )
  const [activeIndex, setActiveIndex] = useState(selectedIndex)

  const labelId = `${id}-label`
  const buttonId = `${id}-button`
  const listboxId = `${id}-listbox`

  const selectedOption = options[selectedIndex] ?? options[0]

  useEffect(() => {
    setActiveIndex(selectedIndex)
  }, [selectedIndex])

  useEffect(() => {
    const onDocumentMouseDown = (event) => {
      if (!wrapperRef.current) return
      if (wrapperRef.current.contains(event.target)) return
      setOpen(false)
    }

    document.addEventListener('mousedown', onDocumentMouseDown)
    return () => document.removeEventListener('mousedown', onDocumentMouseDown)
  }, [])

  useEffect(() => {
    if (!open) return
    const raf = requestAnimationFrame(() => listboxRef.current?.focus())
    return () => cancelAnimationFrame(raf)
  }, [open])

  const close = () => {
    setOpen(false)
    buttonRef.current?.focus()
  }

  const commitIndex = (index) => {
    const next = options[index]
    if (!next) return
    onChange(next.value)
    close()
  }

  const onButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      setActiveIndex((prev) => {
        const next =
          event.key === 'ArrowDown'
            ? prev + 1
            : prev - 1
        return clamp(next, 0, options.length - 1)
      })
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen((prev) => !prev)
      return
    }
  }

  const onListboxKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((prev) => {
        const next =
          event.key === 'ArrowDown'
            ? prev + 1
            : prev - 1
        return clamp(next, 0, options.length - 1)
      })
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setActiveIndex(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      setActiveIndex(options.length - 1)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      commitIndex(activeIndex)
    }
  }

  return (
    <div
  className={`topbar-control topbar-select ${open ? "open" : ""}`}
  ref={wrapperRef}
>
      <span className="topbar-control-label" id={labelId}>
        {label}
      </span>

      <button
        type="button"
        id={buttonId}
        ref={buttonRef}
        className="topbar-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={`${labelId} ${buttonId}`}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={onButtonKeyDown}
      >
        <span className="topbar-select-triggerText">{selectedOption?.label}</span>
      </button>

      {open ? (
        <ul
          ref={listboxRef}
          id={listboxId}
          className="topbar-select-menu"
          role="listbox"
          aria-labelledby={labelId}
          tabIndex={-1}
          onKeyDown={onListboxKeyDown}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value
            const isActive = index === activeIndex
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={[
                  'topbar-select-item',
                  isSelected ? 'is-selected' : '',
                  isActive ? 'is-active' : ''
                ].join(' ')}
              >
                <button
                  type="button"
                  className="topbar-select-option"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => commitIndex(index)}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

const Topbar = () => {
  const {
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    totalCount,
    allCount,
    countNoun,
    filterOptions,
    sortOptions
  } = useTopbar()

  const noun = countNoun ?? { singular: 'product', plural: 'products' }
  const nounFor = (value) => (value === 1 ? noun.singular : noun.plural)

  const displayText = totalCount > 0
    ? `Showing ${totalCount} ${nounFor(totalCount)} out of ${allCount} ${nounFor(allCount)}`
    : `No ${noun.plural} found`

  return (
<div className="topbar clearfix">
      <div className="topbar-inner">
        {/* Left Zone: ProductCount */}
        <div className="left-zone">
          <span className="product-count">{displayText}</span>
        </div>

        {/* Right Zone: Filter By & Sort By */}
        <div className="right-zone">
          <TopbarSelect
            id="filter-select"
            label="Filter By"
            value={filterBy}
            onChange={setFilterBy}
            options={filterOptions}
          />

          <TopbarSelect
            id="sort-select"
            label="Sort By"
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
          />
        </div>
      </div>
    </div>
  )
}

export default Topbar
